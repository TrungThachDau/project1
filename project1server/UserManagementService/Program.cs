using Microsoft.EntityFrameworkCore;
using UserManagementService.Data;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using UserManagementService.Services;
using UserManagementService.Repositories;

namespace UserManagementService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("Docker"),
                    options => options.EnableRetryOnFailure()));

            FirebaseApp.Create(new AppOptions
            {
                Credential = GoogleCredential.FromFile("Firebase/project1-2b957-firebase-adminsdk-ewvi3-0da4d9263a.json")
            });


            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", policyBuilder =>
                    policyBuilder.AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin()
                        .SetIsOriginAllowed(_ => true));
            });

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddHttpClient();
            builder.Services.AddScoped<IAuthRepo, AuthService>();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    string urlVerify = "https://securetoken.google.com/project1-2b957";
                    options.Authority = urlVerify;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = urlVerify,
                        ValidAudience = "project1-2b957",
                        //IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your_secret_key"))
                    };
                }).AddCookie("JwtCookie", options =>
            {
                options.Cookie.Name = "jwt";
                options.Cookie.HttpOnly = true;
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
                options.Events.OnRedirectToLogin = context =>
                {
                    context.Response.StatusCode = 401;
                    return Task.CompletedTask;
                };
            });
            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();
            app.UseCors("AllowAllOrigins");
            app.UseAuthentication();
            app.UseMiddleware<FirebaseAuthenticationMiddleware>();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
