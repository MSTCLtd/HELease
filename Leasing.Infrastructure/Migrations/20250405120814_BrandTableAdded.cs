using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Leasing.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class BrandTableAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address",
                table: "Users",
                newName: "SupplierAddress");

            migrationBuilder.AddColumn<string>(
                name: "ContactPersonName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasGstRegistration",
                table: "Users",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrganizationPan",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactPersonName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "HasGstRegistration",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "OrganizationPan",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "SupplierAddress",
                table: "Users",
                newName: "Address");
        }
    }
}
