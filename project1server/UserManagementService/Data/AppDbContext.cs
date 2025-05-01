using Microsoft.EntityFrameworkCore;
using UserManagementService.Models;

namespace UserManagementService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<UserModel> Users { get; set; }
        public DbSet<RoleModel> Roles { get; set; }
        public DbSet<PermissionModel> Permissions { get; set; }
        public DbSet<RolePermissionModel> RolePermissions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            _ = modelBuilder.Entity<UserModel>()
                .HasOne(p => p.role)
                .WithMany()
                .HasForeignKey(p => p.id_role);


            _ = modelBuilder.Entity<RolePermissionModel>()
                .HasOne(p => p.role)
                .WithMany()
                .HasForeignKey(p => p.id_role);
            _ = modelBuilder.Entity<RolePermissionModel>()
                .HasOne(p => p.permission)
                .WithMany()
                .HasForeignKey(p => p.id_permission);

        }
    }
}
