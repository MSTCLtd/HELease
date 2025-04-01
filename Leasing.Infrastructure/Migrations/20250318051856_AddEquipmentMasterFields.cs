using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Leasing.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddEquipmentMasterFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EquipmentTypeCode",
                table: "EquipmentMasters",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "EquipmentTypeName",
                table: "EquipmentMasters",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "EquipmentMasters",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SystemId",
                table: "EquipmentMasters",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EquipmentTypeCode",
                table: "EquipmentMasters");

            migrationBuilder.DropColumn(
                name: "EquipmentTypeName",
                table: "EquipmentMasters");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "EquipmentMasters");

            migrationBuilder.DropColumn(
                name: "SystemId",
                table: "EquipmentMasters");
        }
    }
}
