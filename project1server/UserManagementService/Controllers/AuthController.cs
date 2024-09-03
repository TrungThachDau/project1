using Microsoft.AspNetCore.Mvc;
using FirebaseAdmin.Auth;
using System.Threading.Tasks;
using System.Text.Json.Serialization;
using Google.Apis.Auth.OAuth2.Requests;

namespace UserManagementService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        
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
    }

    public class TokenRequest
    {
        public string IdToken { get; set; }
    }

}
