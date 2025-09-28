using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
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

        /// <summary>
        /// Lấy toàn bộ danh sách quyền theo vai trò trong hệ thống.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RolePermissionModel>>> GetRolePermissions()
        {
            return await _context.RolePermissions.ToListAsync();
        }

        /// <summary>
        /// Lấy chi tiết quyền theo ID.
        /// </summary>
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

        /// <summary>
        /// Lấy toàn bộ quyền gắn với một vai trò.
        /// </summary>
        [HttpGet("get-permission/{id_role}")]
        public async Task<ActionResult<RolePermissionModel>> GetPermission(int id_role)
        {
            var permission = await _context.RolePermissions
                .Where(p => p.id_role == id_role)
                .Include(p => p.permission)
                .ToArrayAsync();

            return Ok(permission);
        }

        /// <summary>
        /// Cập nhật quyền theo ID.
        /// </summary>
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

                throw;
            }

            return NoContent();
        }

        /// <summary>
        /// Cập nhật toàn bộ quyền của vai trò sau khi xác thực token.
        /// </summary>
        [HttpPut("update-role-permission/{id_role}")]
        public async Task<IActionResult> UpdateRolePermission(int id_role, RolePermissionModel[] rolePermissionModels, string idToken)
        {
            if (string.IsNullOrWhiteSpace(idToken))
            {
                return Unauthorized(new { message = "Thiếu token xác thực." });
            }

            try
            {
                var response = await _httpClient.PostAsJsonAsync(
                    "https://localhost:7175/api/auth/verify-token",
                    new { token = idToken });

                if (!response.IsSuccessStatusCode)
                {
                    return Unauthorized(new { message = "Token không hợp lệ." });
                }

                var existingRolePermissions = await _context.RolePermissions
                    .Where(p => p.id_role == id_role)
                    .ToListAsync();

                if (existingRolePermissions.Any())
                {
                    _context.RolePermissions.RemoveRange(existingRolePermissions);
                }

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

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Có lỗi xảy ra: {ex.Message}");
            }
        }

        /// <summary>
        /// Thêm quyền mới.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<RolePermissionModel>> PostRolePermissionModel(RolePermissionModel rolePermissionModel)
        {
            _context.RolePermissions.Add(rolePermissionModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRolePermissionModel", new { id = rolePermissionModel.id_role_permission }, rolePermissionModel);
        }

        /// <summary>
        /// Xóa quyền theo ID.
        /// </summary>
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
}

