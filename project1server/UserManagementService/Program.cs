using Microsoft.EntityFrameworkCore;
using UserManagementService.Data;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Configuration;
namespace UserManagementService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.
            builder.Services.AddDbContext<AppDbContext>(options =>
               options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), options => options.EnableRetryOnFailure()));
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile("Firebase/project1-2b957-firebase-adminsdk-ewvi3-0da4d9263a.json")
            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins",
                    policyBuilder => policyBuilder.AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin()
                        //.AllowCredentials()
                        .SetIsOriginAllowed(_ => true)
                );
            });
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddHttpClient();               
            var app = builder.Build();
            
            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowAllOrigins");
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
