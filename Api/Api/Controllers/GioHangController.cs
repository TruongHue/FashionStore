using Api.Data;
using Api.Models;
using Api.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class GioHangController : ControllerBase
	{

		private readonly DataContext _context;

		public GioHangController(DataContext context)
		{
			_context = context;
		}

		[HttpGet]

		public async Task<ActionResult<IEnumerable<GioHangViewModel>>> Get(int idUser)
		{
			var list = await _context.GioHangs.Where(l => l.idUser == idUser).Include(l => l.SanPham)
				.Select(l => new GioHangViewModel
				{
						tenSP = l.SanPham.tenSP,
						soLuong = l.SanPham.soLuong,
						gia = l.SanPham.giaBan,
						image = l.SanPham.image,
                }).ToListAsync();

			return list;
		}
		
		[HttpPost]
		public GioHangModel Post([FromQuery] GioHangModel Model)
		{
			_context.GioHangs.Add(Model);
			_context.SaveChanges();
			return Model;
		}

		//Cap nhat so luong san pham trong gio hang
		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id, GioHangModel Model)
		{
			if (id != Model.idGioHang)
			{
				return BadRequest();
			}

			var gioHang = await _context.GioHangs.FindAsync(id);
			if (gioHang == null)
			{
				return NotFound();
			}

			gioHang.soLuong = Model.soLuong;
			_context.GioHangs.Update(gioHang);

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException) when (!GioHangExists(id))
			{
				return NotFound();
			}

			return NoContent();
		}

		private bool GioHangExists(int Id)
		{
			throw new NotImplementedException();
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int Id)
		{
			var gioHang = await _context.GioHangs.FindAsync(Id);
			if (gioHang == null)
			{
				return NotFound();
			}

			_context.GioHangs.Remove(gioHang);
			await _context.SaveChangesAsync();

			return NoContent();
		}

	}
}
