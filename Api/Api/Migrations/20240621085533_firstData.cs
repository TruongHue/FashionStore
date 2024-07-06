using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    /// <inheritdoc />
    public partial class firstData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DanhMucs",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    tenDM = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    moTa = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhMucs", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ThuongHieus",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    tenTH = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    moTa = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ThuongHieus", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    idUser = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    userName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    tenUser = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    sdt = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    diaChi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    quyen = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.idUser);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SanPhams",
                columns: table => new
                {
                    idSP = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    tenSP = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    moTa = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    giaBan = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    soLuong = table.Column<int>(type: "int", nullable: false),
                    idThuongHieu = table.Column<int>(type: "int", nullable: true),
                    idDanhMuc = table.Column<int>(type: "int", nullable: true),
                    image = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SanPhams", x => x.idSP);
                    table.ForeignKey(
                        name: "FK_SanPhams_DanhMucs_idDanhMuc",
                        column: x => x.idDanhMuc,
                        principalTable: "DanhMucs",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_SanPhams_ThuongHieus_idThuongHieu",
                        column: x => x.idThuongHieu,
                        principalTable: "ThuongHieus",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "HoaDons",
                columns: table => new
                {
                    idHD = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    diaChi = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    idUser = table.Column<int>(type: "int", nullable: true),
                    ngayTao = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    trangThaiHD = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    tongTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDons", x => x.idHD);
                    table.ForeignKey(
                        name: "FK_HoaDons_Users_idUser",
                        column: x => x.idUser,
                        principalTable: "Users",
                        principalColumn: "idUser");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "GioHangs",
                columns: table => new
                {
                    idGioHang = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    idUser = table.Column<int>(type: "int", nullable: false),
                    idSP = table.Column<int>(type: "int", nullable: false),
                    gia = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    soLuong = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GioHangs", x => x.idGioHang);
                    table.ForeignKey(
                        name: "FK_GioHangs_SanPhams_idSP",
                        column: x => x.idSP,
                        principalTable: "SanPhams",
                        principalColumn: "idSP",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GioHangs_Users_idUser",
                        column: x => x.idUser,
                        principalTable: "Users",
                        principalColumn: "idUser",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ChiTietHoaDons",
                columns: table => new
                {
                    idCTHD = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    idHD = table.Column<int>(type: "int", nullable: true),
                    iHD = table.Column<int>(type: "int", nullable: false),
                    idSP = table.Column<int>(type: "int", nullable: false),
                    idSanPham = table.Column<int>(type: "int", nullable: false),
                    soLuong = table.Column<int>(type: "int", nullable: false),
                    giaBan = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    thanhTien = table.Column<decimal>(type: "decimal(18,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietHoaDons", x => x.idCTHD);
                    table.ForeignKey(
                        name: "FK_ChiTietHoaDons_HoaDons_iHD",
                        column: x => x.iHD,
                        principalTable: "HoaDons",
                        principalColumn: "idHD",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ChiTietHoaDons_SanPhams_idSanPham",
                        column: x => x.idSanPham,
                        principalTable: "SanPhams",
                        principalColumn: "idSP",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietHoaDons_idSanPham",
                table: "ChiTietHoaDons",
                column: "idSanPham");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietHoaDons_iHD",
                table: "ChiTietHoaDons",
                column: "iHD");

            migrationBuilder.CreateIndex(
                name: "IX_GioHangs_idSP",
                table: "GioHangs",
                column: "idSP");

            migrationBuilder.CreateIndex(
                name: "IX_GioHangs_idUser",
                table: "GioHangs",
                column: "idUser");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDons_idUser",
                table: "HoaDons",
                column: "idUser");

            migrationBuilder.CreateIndex(
                name: "IX_SanPhams_idDanhMuc",
                table: "SanPhams",
                column: "idDanhMuc");

            migrationBuilder.CreateIndex(
                name: "IX_SanPhams_idThuongHieu",
                table: "SanPhams",
                column: "idThuongHieu");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietHoaDons");

            migrationBuilder.DropTable(
                name: "GioHangs");

            migrationBuilder.DropTable(
                name: "HoaDons");

            migrationBuilder.DropTable(
                name: "SanPhams");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "DanhMucs");

            migrationBuilder.DropTable(
                name: "ThuongHieus");
        }
    }
}
