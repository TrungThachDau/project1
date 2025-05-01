using Microsoft.AspNetCore.Mvc;
using FirebaseAdmin.Auth;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Google.Apis.Auth.OAuth2.Requests;
using Microsoft.EntityFrameworkCore;
using UserManagementService.Data;
using UserManagementService.Models;
using UserManagementService.Services;

namespace UserManagementService.Controllers
{
    public interface ITokenService
    {
        Task<string> VerifyToken(string idToken);
    }
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IAuthService _authService;

        public AuthController(AppDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }
        [HttpPost("verify-token")]
        public async Task<IActionResult> VerifyToken([FromBody] TokenRequest request)
        {
            try
            {
                // Xác thực token Firebase
                FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(request.IdToken);
                string uid = decodedToken.Uid;

                // Token hợp lệ
                return Ok(new { message = "Token is valid", uid });
            }
            catch (FirebaseAuthException ex)
            {
                // Token không hợp lệ hoặc gặp lỗi khác
                return Unauthorized(new { message = "Token is invalid", error = ex.Message });
            }
        }
        [HttpPut("update-last-login/{id}")]
        public async Task<IActionResult> UpdateLastLogin(string id)
        {
            try
            {
                await _authService.UpdateLastLogin(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
           
        }
        [HttpGet("get-user")]
        public async Task<ActionResult<UserModel>> GetUser()
        {
            var authHeader = Request.Headers["Authorization"].ToString();

            if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
            {
                return Unauthorized(new { message = "Missing or invalid Authorization header" });
            }

            var idToken = authHeader.Replace("Bearer ", "");

            var query = await _authService.GetUser(idToken);
            return Ok(query);
        }
        [HttpGet("get-permission/{uid}")]
        public async Task<ActionResult<UserModel>> GetPermission(string uid)
        {
            var user = await _context.Users.FindAsync(uid);

            if (user == null)
            {
                return NotFound("User not found.");
            }
            //Lay rolepermision cua role 1
            var rolePermission = await _context.RolePermissions
                .Where(rp => rp.id_role == user.id_role)
                .ToListAsync();
            if (rolePermission == null || !rolePermission.Any())
            {
                return NotFound("User doesn't have any permissions.");
            }
            var permission = await _context.Permissions
                    .Where(p => rolePermission
                    .Select(rp => rp.id_permission)
                    .Contains(p.id_permission))
                    .Select(p => p.permission_name.Trim())
                    .ToListAsync();
            return Ok(permission);
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

    public class TokenRequest
    {
        public string IdToken { get; set; }
    }


}
