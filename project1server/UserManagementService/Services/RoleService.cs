using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using UserManagementService.Data;
using UserManagementService.Models;

namespace UserManagementService.Services;

public interface IRoleService
{
    Task<IEnumerable<RoleModel>> GetRolesAsync();
    Task<IEnumerable<RoleModel>> GetRoleByIdAsync(int id);
    Task<IEnumerable<RoleModel>> UpdateRoleById(int id, RoleModel role);

}

public class RoleService : IRoleService
{
    private readonly AppDbContext _context;
    public RoleService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<RoleModel>> GetRolesAsync()
    {
        return await _context.Roles.ToListAsync();
    }

    public async Task<IEnumerable<RoleModel>> GetRoleByIdAsync(int id)
    {
        return await _context.Roles.Where(r => r.id_role == id).ToListAsync();
    }

    public async Task<IEnumerable<RoleModel>> UpdateRoleById(int id, RoleModel role)
    {
        var existingRole = await _context.Roles.FindAsync(id);
        if (existingRole == null)
        {
            throw new KeyNotFoundException($"Role with ID {id} not found.");
        }

        existingRole.name_role = role.name_role;
        existingRole.description = role.description;

        await _context.SaveChangesAsync();
        return await GetRolesAsync();
    }


}