using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TempHumidTrackerAPI.Migrations
{
    /// <inheritdoc />
    public partial class wheathercorrectness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_WheatherData",
                table: "WheatherData");

            migrationBuilder.RenameTable(
                name: "WheatherData",
                newName: "WeatherData");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Timestamp",
                table: "WeatherData",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WeatherData",
                table: "WeatherData",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_WeatherData",
                table: "WeatherData");

            migrationBuilder.RenameTable(
                name: "WeatherData",
                newName: "WheatherData");

            migrationBuilder.AlterColumn<DateTime>(
                name: "Timestamp",
                table: "WheatherData",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_WheatherData",
                table: "WheatherData",
                column: "Id");
        }
    }
}
