using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KendoUI_MVC.Migrations
{
    public partial class addres : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "NotifyConsignee",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "NotifyConsignee");
        }
    }
}
