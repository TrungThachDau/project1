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
    public class RoleController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RoleController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Role
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RoleModel>>> GetRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        // GET: api/Role/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RoleModel>> GetRoleModel(int id)
        {
            var roleModel = await _context.Roles.FindAsync(id);

            if (roleModel == null)
            {
                return NotFound();
            }

            return roleModel;
        }

        // PUT: api/Role/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoleModel(int id, RoleModel roleModel)
        {
            if (id != roleModel.id_role)
            {
                return BadRequest();
            }

            _context.Entry(roleModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RoleModelExists(id))
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
