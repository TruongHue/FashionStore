using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ChiTietHoaDonController : Controller
    {
        private readonly DataContext _context;

        public ChiTietHoaDonController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("chitiethoadon")]
        public async Task<ActionResult<IEnumerable<ChiTietHoaDonModel>>> ChiTetHoaDons()
        {
            var chiTietHoaDons = await _context.ChiTietHoaDons.Include(d => d.SanPham).ToListAsync();

            return Ok(chiTietHoaDons);
            //return await _context.ChiTietHoaDons.ToListAsync();
        }

        [HttpPost("chitiethoadon/{id}")]
        public async Task<ActionResult<ChiTietHoaDonModel>> GetChitietHoaDon(int id)
        {
            var chiTietHoaDon = await _context.ChiTietHoaDons
                .Where(d => d.idHD == id)
                .Select(d => new ChiTietHoaDonModel
                {
                    giaBan = d.giaBan,
                    soLuong = d.soLuong,
                    thanhTien = d.giaBan * d.soLuong,
                    SanPham = new SanPhamModel
                    {
                        tenSP = d.SanPham.tenSP,
                        image = d.SanPham.image,
                    }
                })
                .FirstOrDefaultAsync();

            if (chiTietHoaDon == null)
            {
                return NotFound();
            }

            return Ok(chiTietHoaDon);
        }

        [HttpPost("huydon/{id}")]
        public async Task<ActionResult<HoaDonModel>> HuyDon(int id)
        {
            var hoaDon = await _context.HoaDons.FindAsync(id);

            if (hoaDon == null)
            {
                return NotFound();
            }

            hoaDon.trangThaiHD = "Đã hủy";

            try
            {
                await _context.SaveChangesAsync();
                return Ok(hoaDon);
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
            }
        }

        [HttpPost("thongtintaikhoan/{idUser}")]
        public async Task<ActionResult<UserModel>> ThongTinTaiKhoan(int idUser)
        {
            var user = await _context.Users.FindAsync(idUser);

            if (user == null)
            {
                return NotFound();
            }

            var userModel = new UserModel
            {
                tenUser = user.tenUser,
                diaChi = user.diaChi,
                sdt = user.sdt
                // Add other properties you need
            };

            return Ok(userModel);
        }
    }
}
