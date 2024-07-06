using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
	[ApiController]
	[Route("[controller]")]

	public class HoaDonController : ControllerBase
	{

		private readonly DataContext _context;

		public HoaDonController(DataContext context)
		{
			_context = context;
		}

        [HttpGet]
        public async Task<ActionResult<IEnumerable<HoaDonModel>>> Get()
        {
            return await _context.HoaDons.OrderBy(p => p.idHD).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HoaDonModel>> Get([FromQuery] int id)
        {
            var hoadon = await _context.HoaDons.FindAsync(id);
            if (hoadon == null)
            {
                return NotFound();
            }
            return hoadon;
            //return _context.HoaDons.Where(d => d.id == id).FirstOrDefault();
        }

        [HttpPost]
        public async Task<ActionResult<HoaDonModel>> Post([FromQuery] HoaDonModel Model)
        {
			/*var hoadon = new HoaDonModel
			{
				diaChi = Model.diaChi,
				idUser = Model.idUser,
				ngayTao = Model.ngayTao,
				trangThaiHD	= Model.trangThaiHD,
				tongTien = Model.tongTien,
			};*/
            //_context.HoaDons.Add(hoadon);
            _context.HoaDons.Add(Model);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = Model.idHD }, Model);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, HoaDonModel Model)
		{
			if (id != Model.idHD)
			{
				return BadRequest();
			}

			var hoaDon = await _context.HoaDons.FindAsync(id);
			if (hoaDon == null)
			{
				return NotFound();
			}

			hoaDon.trangThaiHD = Model.trangThaiHD;
			hoaDon.ngayTao = Model.ngayTao;
			hoaDon.tongTien = Model.tongTien;
			hoaDon.idUser = Model.idUser;
			_context.HoaDons.Update(hoaDon);

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException) when (!HoaDonExists(id))
			{
				return NotFound();
			}

			return NoContent();
		}

		private bool HoaDonExists(int Id)
		{
			throw new NotImplementedException();
		}

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int Id)
		{
			var hoaDon = await _context.HoaDons.FindAsync(Id);
			if (hoaDon == null)
			{
				return NotFound();
			}

			_context.HoaDons.Remove(hoaDon);
			await _context.SaveChangesAsync();

			return NoContent();
		}
    }
}
