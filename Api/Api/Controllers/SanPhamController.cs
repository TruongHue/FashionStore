using Api.Data;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
/*using System.IO;
using Microsoft.AspNetCore.Hosting;*/

namespace Api.Controllers
{
	[ApiController]
	[Route("[controller]")]

	public class SanPhamController : ControllerBase
	{

		private readonly DataContext _context;
		/*private readonly IWebHostEnvironment _environment;*/

		public SanPhamController(DataContext context/*, IWebHostEnvironment environment*/)
		{
			_context = context;
			//_environment = environment;
		}

		//public int Id { get; private set; }

		[HttpGet]
		public async Task<ActionResult<IEnumerable<SanPhamModel>>> Get()
		{
			return await _context.SanPhams.OrderBy(s => s.idSP).ToListAsync();
		}

        [HttpGet("{id}")]
        public async Task<ActionResult<SanPhamModel>> Get([FromQuery] int id)
		{
            var sanpham = await _context.SanPhams.FindAsync(id);
            if (sanpham == null)
            {
                return NotFound();
            }
			return sanpham;
		}

		[HttpGet("{tenSP}")]
		public async Task<ActionResult<SanPhamModel>> Get([FromQuery] string tenSP)
		{
			var sanpham = await _context.SanPhams.FindAsync(tenSP);
			if (sanpham == null)
			{
				return NotFound();
			}
			return sanpham;

		}

        [HttpPost]
		public async Task<ActionResult<SanPhamModel>> PostAsync([FromQuery] SanPhamModel Model)
		{
            /*var danhMuc = await _context.DanhMucs.FirstOrDefaultAsync(d => d.id == Model.idDanhMuc);
            var thuongHieu = await _context.ThuongHieus.FirstOrDefaultAsync(d => d.id == Model.idThuongHieu);

            if (danhMuc == null || thuongHieu ==null)
            {
				return Model;
            }

            _context.SanPhams.Add(Model);
            await _context.SaveChangesAsync();

            return Model;*/

            _context.SanPhams.Add(Model);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = Model.idSP }, Model);
        }



		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id, SanPhamModel Model)
		{
			if (id != Model.idSP)
			{
				return BadRequest();
			}

            /*var sanPham = await _context.SanPhams.FindAsync(id);
			if (sanPham == null)
			{
				return NotFound();
			}

			sanPham.moTa = Model.moTa;
			sanPham.tenSP = Model.tenSP;
			sanPham.giaBan = Model.giaBan;
			sanPham.image = Model.image;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException) when (!SanPhamExists(id))
			{
				return NotFound();
			}*/

            _context.Entry(Model).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanPhamExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
		}

		private bool SanPhamExists(int id)
		{
            return _context.SanPhams.Any(e => e.idSP == id);
        }

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var sanPham = await _context.SanPhams.FindAsync(id);
			if (sanPham == null)
			{
				return NotFound();
			}

			_context.SanPhams.Remove(sanPham);
			await _context.SaveChangesAsync();

			return NoContent();
		}
		
	}
}
