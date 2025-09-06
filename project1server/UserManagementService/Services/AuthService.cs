using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FirebaseAdmin.Auth;
using System.Text;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using UserManagementService.Data;
using UserManagementService.Models;
using UserManagementService.Repositories;

namespace UserManagementService.Services;

public class AuthService : IAuthRepo
{
    private readonly AppDbContext _context;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly SigningCredentials _signingCreds;
    private readonly TimeSpan _tokenLifetime;
    private static readonly JwtSecurityTokenHandler _tokenHandler = new();

    public AuthService(AppDbContext context, IConfiguration config)
    {
        _context = context;
        var secret = config["Jwt:Secret"] ?? "2a+S0N1gEls4FnqjZbBYjdEHzXp9oqTLUpoxZcZiZE0=";
        _issuer = config["Jwt:Issuer"] ?? "android17x.com";
        _audience = config["Jwt:Audience"] ?? "android17x.com";

        // If your secret is Base64, replace with Convert.FromBase64String(secret)
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        _signingCreds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var lifetimeMinutes = int.TryParse(config["Jwt:ExpiresMinutes"], out var m)
            ? m
            : 60; // default 60 minutes
        _tokenLifetime = TimeSpan.FromMinutes(lifetimeMinutes);
    }

    public async Task<string?> SignInAsync(string email, string password)
    {
        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            return null;
        }

        var user = await _context.Users
            .AsNoTracking()
            .Where(u => u.email == email)
            .Select(u => new { u.id_user, u.name, u.email, u.password })
            .SingleOrDefaultAsync();
        if (user is null || user.password != password)
        {
            return null;
        }

        var now = DateTime.UtcNow;
        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.id_user),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
            new Claim(ClaimTypes.Name, user.name ?? string.Empty)
        };
        if (!string.IsNullOrWhiteSpace(user.email))
        {
            claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.email));
        }

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            notBefore: now,
            expires: now.Add(_tokenLifetime),
            signingCredentials: _signingCreds
        );

        var tokenString = _tokenHandler.WriteToken(token);
        return tokenString;
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

    public async Task<IEnumerable<string>> GetPermission([FromHeader] string token)
    {
        var decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
        var uid = decodedToken.Uid;

        var user = await _context.Users.FindAsync(uid);
        if (user == null) return Enumerable.Empty<string>();

        var permissions = await (
            from rp in _context.RolePermissions
            join p in _context.Permissions on rp.id_permission equals p.id_permission
            where rp.id_role == user.id_role
            let permissionName = p.permission_name
            where permissionName != null
            select permissionName.Trim()
        ).Distinct().ToListAsync();

        return permissions;
    }

}