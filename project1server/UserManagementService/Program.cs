using Microsoft.EntityFrameworkCore;
using UserManagementService.Data;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using UserManagementService.Services;
using UserManagementService.Repositories;
using System.Text;

namespace UserManagementService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var configuration = builder.Configuration;
            var services = builder.Services;

            // DbContext
            services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("RDS"), npgsql => npgsql.EnableRetryOnFailure()));

            // Firebase initialization (only once) & config driven
            var firebaseCredPath = configuration["Firebase:CredentialPath"] ?? "Firebase/project1-2b957-firebase-adminsdk-ewvi3-0da4d9263a.json";
            try
            {
                if (FirebaseApp.DefaultInstance == null)
                {
                    if (!string.IsNullOrWhiteSpace(firebaseCredPath) && File.Exists(firebaseCredPath))
                    {
                        FirebaseApp.Create(new AppOptions
                        {
                            Credential = GoogleCredential.FromFile(firebaseCredPath)
                        });
                    }
                    else
                    {
                        // Fallback to default application credentials (env / workload identity)
                        FirebaseApp.Create();
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Firebase initialization failed: {ex.Message}");
                throw; // Fail fast – auth depends on this
            }

            // CORS (could narrow origins via config later)
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", policy =>
                    policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
            });

            services.AddControllers();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddHttpClient();

            // Auth services
            services.AddHttpContextAccessor();
            services.AddScoped<IAuthRepo, AuthService>();

            // JWT / Firebase bearer validation (Google secure token)
            var firebaseProjectId = configuration["Firebase:ProjectId"] ?? "project1-2b957"; // fallback
            var authority = $"https://securetoken.google.com/{firebaseProjectId}";
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.Authority = authority;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidIssuer = authority,
                        ValidateAudience = true,
                        ValidAudience = firebaseProjectId,
                        ValidateLifetime = true,
                        // Google provides signing keys via metadata endpoint – no symmetric key here
                        ValidateIssuerSigningKey = true
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

            // Order: Authentication -> custom Firebase enrichment -> Authorization
            app.UseAuthentication();
            app.UseMiddleware<FirebaseAuthenticationMiddleware>();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
