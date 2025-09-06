using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Http;

namespace UserManagementService.Services;

public class FirebaseAuthenticationMiddleware(RequestDelegate next)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var authHeader = context.Request.Headers["Authorization"].ToString();
        var token = authHeader.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase)
            ? authHeader.Substring("Bearer ".Length).Trim()
            : string.Empty;

        if (!string.IsNullOrEmpty(token))
        {
            try
            {
                await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
            }
            catch
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await context.Response.WriteAsync("Unauthorized");
                return;
            }
        }

        await next(context);
    }
}