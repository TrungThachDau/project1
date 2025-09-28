using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementService.Data;
using UserManagementService.Models;
using UserManagementService.Services;

namespace UserManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IRoleService _roleService;

        public RoleController(AppDbContext context, IRoleService roleService)
        {
            _context = context;
            _roleService = roleService;
        }

        // GET: api/Role
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRoles()
        {
            var roles = await _roleService.GetRolesAsync();
            return Ok(roles);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<RoleModel>> GetRoleById(int id)
        {
            var query = await _roleService.GetRoleByIdAsync(id);

            return query.ToList().Count == 0 ? NotFound() : Ok(query);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoleModel(int id, RoleModel roleModel)
        {
            try
            {
                await _roleService.UpdateRoleById(id, roleModel);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        // POST: api/Role
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RoleModel>> PostRoleModel(RoleModel roleModel)
        {
            _context.Roles.Add(roleModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRoleModel", new { id = roleModel.id_role }, roleModel);
        }

        // DELETE: api/Role/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoleModel(int id)
        {
            var roleModel = await _context.Roles.FindAsync(id);
            if (roleModel == null)
            {
                return NotFound();
            }

            _context.Roles.Remove(roleModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RoleModelExists(int id)
        {
            return _context.Roles.Any(e => e.id_role == id);
        }
    }
}
