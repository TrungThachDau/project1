using FirebaseAdmin.Auth;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementService.Data;
using UserManagementService.Models;

namespace UserManagementService.Services;

public interface IAuthService 
{
    Task<string> VerifyToken(string idToken);
    Task UpdateLastLogin(string id);
    Task <UserModel> GetUser([FromHeader] string token);
    Task<IEnumerable<string>> GetPermission([FromHeader] string token);
}
public class AuthService(AppDbContext context) : IAuthService
{
    public async Task<string> VerifyToken(string idToken)
    {
        FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
        return decodedToken.Uid;
    }

    public async Task UpdateLastLogin(string id)
    {
        var userModel = await context.Users.FindAsync(id);

        if (userModel == null)
        {
            throw new KeyNotFoundException($"User with ID {id} not found.");
        }

        userModel.last_login = DateTime.UtcNow;
        await context.SaveChangesAsync();
    }

    public async Task<UserModel> GetUser([FromHeader] string token)
    {
        FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
        string uid = decodedToken.Uid;
        var userModel = await context.Users.FindAsync(uid);
        if (userModel == null)
        {
            throw new KeyNotFoundException($"User with ID {uid} not found.");
        }
        return userModel;
    }

    public async Task<IEnumerable<string>> GetPermission([FromHeader] string token)
    {
        var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
        var uid = decodedToken.Uid;

        var user = await context.Users.FindAsync(uid);
        if (user == null) return [];

        var permissions = await (
            from rp in context.RolePermissions
            join p in context.Permissions on rp.id_permission equals p.id_permission
            where rp.id_role == user.id_role
            select p.permission_name.Trim()
        ).ToListAsync();

        return permissions;
    }

}