using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace UserManagementService.Migrations
{
    /// <inheritdoc />
    public partial class AddSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "permissions",
                schema: "dbo",
                columns: table => new
                {
                    id_permission = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    permission_name = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_permissions", x => x.id_permission);
                });

            migrationBuilder.CreateTable(
                name: "role",
                schema: "dbo",
                columns: table => new
                {
                    id_role = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name_role = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_role", x => x.id_role);
                });

            migrationBuilder.CreateTable(
                name: "role_permission",
                schema: "dbo",
                columns: table => new
                {
                    id_role_permission = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_role = table.Column<int>(type: "integer", nullable: true),
                    id_permission = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_role_permission", x => x.id_role_permission);
                    table.ForeignKey(
                        name: "FK_role_permission_permissions_id_permission",
                        column: x => x.id_permission,
                        principalSchema: "dbo",
                        principalTable: "permissions",
                        principalColumn: "id_permission");
                    table.ForeignKey(
                        name: "FK_role_permission_role_id_role",
                        column: x => x.id_role,
                        principalSchema: "dbo",
                        principalTable: "role",
                        principalColumn: "id_role");
                });

            migrationBuilder.CreateTable(
                name: "user",
                schema: "dbo",
                columns: table => new
                {
                    id_user = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    phone = table.Column<string>(type: "text", nullable: true),
                    address = table.Column<string>(type: "text", nullable: true),
                    last_login = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    status = table.Column<int>(type: "integer", nullable: true),
                    id_role = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id_user);
                    table.ForeignKey(
                        name: "FK_user_role_id_role",
                        column: x => x.id_role,
                        principalSchema: "dbo",
                        principalTable: "role",
                        principalColumn: "id_role");
                });

            migrationBuilder.CreateIndex(
                name: "IX_role_permission_id_permission",
                schema: "dbo",
                table: "role_permission",
                column: "id_permission");

            migrationBuilder.CreateIndex(
                name: "IX_role_permission_id_role",
                schema: "dbo",
                table: "role_permission",
                column: "id_role");

            migrationBuilder.CreateIndex(
                name: "IX_user_id_role",
                schema: "dbo",
                table: "user",
                column: "id_role");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "role_permission",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "user",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "permissions",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "role",
                schema: "dbo");
        }
    }
}
