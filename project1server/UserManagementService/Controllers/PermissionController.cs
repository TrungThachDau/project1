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
    public class PermissionController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PermissionController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Permission
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PermissionModel>>> GetPermissions()
        {
            return await _context.Permissions.ToListAsync();
        }

        // GET: api/Permission/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PermissionModel>> GetPermissionModel(int id)
        {
            var permissionModel = await _context.Permissions.FindAsync(id);

            if (permissionModel == null)
            {
                return NotFound();
            }

            return permissionModel;
        }

        // PUT: api/Permission/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPermissionModel(int id, PermissionModel permissionModel)
        {
            if (id != permissionModel.id_permission)
            {
                return BadRequest();
            }

            _context.Entry(permissionModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PermissionModelExists(id))
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

        // POST: api/Permission
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PermissionModel>> PostPermissionModel(PermissionModel permissionModel)
        {
            _context.Permissions.Add(permissionModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPermissionModel", new { id = permissionModel.id_permission }, permissionModel);
        }

        // DELETE: api/Permission/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePermissionModel(int id)
        {
            var permissionModel = await _context.Permissions.FindAsync(id);
            if (permissionModel == null)
            {
                return NotFound();
            }

            _context.Permissions.Remove(permissionModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PermissionModelExists(int id)
        {
            return _context.Permissions.Any(e => e.id_permission == id);
        }
    }
}
