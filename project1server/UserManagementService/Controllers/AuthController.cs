using Microsoft.AspNetCore.Mvc;
using FirebaseAdmin.Auth;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Google.Apis.Auth.OAuth2.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using UserManagementService.Data;
using UserManagementService.Models;
using UserManagementService.Services;
using UserManagementService.Repositories;

namespace UserManagementService.Controllers
{
    public interface ITokenService
    {
        Task<string> VerifyToken(string idToken);
    }
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthRepo authService) : ControllerBase
    {
        [HttpPost("verify-token")]
        public async Task<IActionResult> VerifyToken([FromBody] string request)
        {
            var query = await authService.VerifyToken(request);
            return Ok(new { message = "Token verified successfully", uid = query });
        }
        [Authorize]
        [HttpPut("update-last-login/{id}")]
        public async Task<IActionResult> UpdateLastLogin(string id)
        {
            try
            {
                await authService.UpdateLastLogin(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
           
        }
        [Authorize]
        [HttpGet("get-user")]
        public async Task<ActionResult<UserModel>> GetUser()
        {
            var authHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized(new { message = "Missing or invalid Authorization header" });
            }

            var idToken = authHeader.Replace("Bearer ", "");

            var query = await authService.GetUser(idToken);
            return Ok(query);
        }
        [Authorize]
        [HttpGet("get-permission")]
        public async Task<ActionResult<UserModel>> GetPermission()
        {
            var authHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized(new { message = "Missing or invalid Authorization header" });
            }

            var idToken = authHeader.Replace("Bearer ", "");
            var query = await authService.GetPermission(idToken);
            return Ok(query);
        }
        //[Route("get-user/{uid}")] // Use Route attribute for clear path definition
        //[HttpGet("{id}")] // Maintain HttpGet for GET requests
        //public async Task<ActionResult<UserModel>> GetUserModel(int id)
        //{
        //    try
        //    {
        //        var userModel = await _context.Users.FindAsync(id);

        //        if (userModel == null)
        //        {
        //            return NotFound(); // Return NotFound status code for missing user
        //        }

        //        return Ok(userModel); // Return Ok status code with the user model
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message); // Handle exceptions and return BadRequest
        //    }
        //}
        //[Route("get-permission-user/{uid}")]
        //[HttpGet]
        //public async Task<IActionResult> GetPermissionUser(int uid)
        //{
        //    var userRole = await _context.Users.FindAsync(uid);
        //    if (uid == null)
        //    {
        //        return NotFound();
        //    }
        //    var rolePermission = await _context.RolePermissions.Where(rp => rp.id_role == userRole.id_role).ToListAsync();

        //    if (rolePermission != null)
        //    {
        //        var permission = await _context.Permissions.Where(p => rolePermission.Select(rp => rp.id_permission).Contains(p.id_permission)).ToListAsync();
        //        return Ok(permission);
        //    }

        //    return NotFound();
        //}
    }

}
