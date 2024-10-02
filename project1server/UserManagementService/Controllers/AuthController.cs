using Microsoft.AspNetCore.Mvc;
using FirebaseAdmin.Auth;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Google.Apis.Auth.OAuth2.Requests;
using Microsoft.EntityFrameworkCore;
using UserManagementService.Data;
using UserManagementService.Models;

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

        public AuthController(AppDbContext context)
        {
            _context = context;
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
        
        [HttpGet("get-user/{id}")]
        public async Task<ActionResult<UserModel>> GetUserModel(string id)
        {
            var userModel = await _context.Users.FindAsync(id);

            if (userModel == null)
            {
                return NotFound();
            }

            return userModel;
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
