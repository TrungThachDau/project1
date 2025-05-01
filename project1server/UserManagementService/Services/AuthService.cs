using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Mvc;
using UserManagementService.Data;
using UserManagementService.Models;

namespace UserManagementService.Services;

public interface IAuthService 
{
    Task<string> VerifyToken(string idToken);
    Task UpdateLastLogin(string id);
    Task <UserModel> GetUser([FromHeader] string token);
    //Task<UserModel> GetUserModel(string id);
}
public class AuthService: IAuthService
{
    private readonly AppDbContext _context;
    public AuthService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<string> VerifyToken(string idToken)
    {
        FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
        return decodedToken.Uid;
    }

    public async Task UpdateLastLogin(string id)
    {
        var userModel = await _context.Users.FindAsync(id);

        if (userModel == null)
        {
            throw new KeyNotFoundException($"User with ID {id} not found.");
        }

        userModel.last_login = DateTime.UtcNow;
        await _context.SaveChangesAsync();
    }

    public async Task<UserModel> GetUser([FromHeader] string token)
    {
        FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
        string uid = decodedToken.Uid;
        var userModel = await _context.Users.FindAsync(uid);
        if (userModel == null)
        {
            throw new KeyNotFoundException($"User with ID {uid} not found.");
        }
        return userModel;
    }
}