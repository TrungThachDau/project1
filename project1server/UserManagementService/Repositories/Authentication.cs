using Microsoft.AspNetCore.Mvc;
using UserManagementService.Models;

namespace UserManagementService.Repositories
{
    public interface IAuthRepo
    {
        Task<string> VerifyToken(string idToken);
        Task UpdateLastLogin(string id);
        Task<UserModel> GetUser([FromHeader] string token);
        Task<IEnumerable<string>> GetPermission([FromHeader] string token);
    }
}
