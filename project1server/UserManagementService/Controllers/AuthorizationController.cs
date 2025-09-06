using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementService.Data;
using UserManagementService.Models;
namespace UserManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;

        public AuthorizationController(AppDbContext context, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
        }

        // GET: api/Authorization
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolePermissionModel>>> GetRolePermissions()
        {
            return await _context.RolePermissions.ToListAsync();
        }

        // GET: api/Authorization/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RolePermissionModel>> GetRolePermissionModel(int id)
        {
            var rolePermissionModel = await _context.RolePermissions.FindAsync(id);

            if (rolePermissionModel == null)
            {
                return NotFound();
            }

            return rolePermissionModel;
        }
        [HttpGet("get-permission/{id_role}")]
        public async Task<ActionResult<RolePermissionModel>> GetPermission(int id_role)
        {
            //Nhap vao id_role, tim tat ca cac quyen cua role do
            var permission = await _context.RolePermissions.Where(p => p.id_role == id_role).Include(p => p.permission).ToArrayAsync();
            if (permission == null)
            {
                return NotFound("Permission not found.");
            }

            return Ok(permission);
        }

        // PUT: api/Authorization/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRolePermissionModel(int id, RolePermissionModel rolePermissionModel)
        {
            if (id != rolePermissionModel.id_role_permission)
            {
                return BadRequest();
            }

            _context.Entry(rolePermissionModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RolePermissionModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpPut("update-role-permission/{id_role}")]
        public async Task<IActionResult> UpdateRolePermission(int id_role, RolePermissionModel[] rolePermissionModels, string idToken)
        {
            try
            {
                // Gọi API xác minh token
                var response = await _httpClient.PostAsJsonAsync("https://localhost:7175/api/auth/verify-token", idToken);
                if (!response.IsSuccessStatusCode)
                {
                    return Unauthorized(new { message = "Token không hợp lệ." });
                }
                var existingRolePermissions = await _context.RolePermissions
                                             .Where(p => p.id_role == id_role)
                                             .ToListAsync();

                if (existingRolePermissions == null)
                {
                    throw new Exception("Failed to retrieve role permissions from database.");
                }

                // Xóa quyền hiện có
                if (existingRolePermissions.Any())
                {
                    _context.RolePermissions.RemoveRange(existingRolePermissions);
                }

                // Nếu dữ liệu quy���n không rỗng, thêm các quyền mới
                if (rolePermissionModels != null && rolePermissionModels.Any())
                {
                    foreach (var rolePermissionModel in rolePermissionModels)
                    {
                        var newRolePermission = new RolePermissionModel
                        {
                            id_role = id_role,
                            id_permission = rolePermissionModel.id_permission,
                            permission = null,
                            role = null
                        };

                        _context.RolePermissions.Add(newRolePermission);
                    }
                }

                // Lưu các thay đổi vào cơ sở dữ liệu
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Có lỗi xảy ra: {ex.Message}");
            }
        }




        // POST: api/Authorization
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RolePermissionModel>> PostRolePermissionModel(RolePermissionModel rolePermissionModel)
        {
            _context.RolePermissions.Add(rolePermissionModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRolePermissionModel", new { id = rolePermissionModel.id_role_permission }, rolePermissionModel);
        }

        // DELETE: api/Authorization/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRolePermissionModel(int id)
        {
            var rolePermissionModel = await _context.RolePermissions.FindAsync(id);
            if (rolePermissionModel == null)
            {
                return NotFound();
            }

            _context.RolePermissions.Remove(rolePermissionModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RolePermissionModelExists(int id)
        {
            return _context.RolePermissions.Any(e => e.id_role_permission == id);
        }


    }

    public class TokenRequest
    {
        public string IdToken { get; set; } = string.Empty;
    }
}