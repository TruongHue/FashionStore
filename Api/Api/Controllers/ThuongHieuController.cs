using Api.Data;
using Api.Models;
using Api.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ThuongHieuController : Controller
    {
        private readonly DataContext _context;

        public ThuongHieuController(DataContext context)
        {
            _context = context;
        }

        //public int Id { get; private set; }

        //Lay danh sach thuong hieu
        [HttpGet]
        public async Task<IEnumerable<ThuongHieuModel>> Get()
        {
            return await _context.ThuongHieus.OrderBy(p => p.id).ToListAsync();
        }

        //Lay 1 thuong hieu
        /*[HttpGet("{id}")]
        public async Task<ActionResult<ThuongHieuModel>> Get([FromQuery] int id)
        {
            var thuonghieu = await _context.ThuongHieus.FindAsync(id);
            if (thuonghieu == null)
            {
                return NotFound();
            }
            return thuonghieu;
            //return _context.ThuongHieus.Where(d => d.id == id).FirstOrDefault();
        }*/

        //Lay san pham trong thuong hieu
        [HttpGet("{id}/sanpham")]
        public async Task<ActionResult<IEnumerable<SanPhamiItemViewModel>>> GetLoaiIdProducts(int id)
        {
            var thuongHieu = await _context.ThuongHieus.FindAsync(id);
            if (thuongHieu == null)
            {
                return NotFound();
            }

            var sanPhams = await _context.SanPhams.Where(s => s.idThuongHieu == id).Include(s => s.DanhMuc)
            .Select(s => new SanPhamiItemViewModel
            {
                idSP = s.idSP,
                tenSP = s.tenSP,
                moTa = s.moTa,
                giaBan = s.giaBan,
                soLuong = s.soLuong,
                tenThuongHieu = thuongHieu.tenTH,
                tenDanhMuc = s.DanhMuc.tenDM,
                image = s.image
            }).ToListAsync();

            return sanPhams;
        }

        //Them thuong hieu
        [HttpPost]
        public async Task<ActionResult<ThuongHieuModel>> Post([FromQuery] ThuongHieuModel Model)
        {
            _context.ThuongHieus.Add(Model);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = Model.id }, Model);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, ThuongHieuModel Model)
        {
            if (id != Model.id)
            {
                return BadRequest();
            }

            var thuonghieu = await _context.ThuongHieus.FindAsync(id);
            if (thuonghieu == null)
            {
                return NotFound();
            }

            thuonghieu.moTa = Model.moTa;
            thuonghieu.tenTH = Model.tenTH;
            _context.ThuongHieus.Update(thuonghieu);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!ThuongHieuExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        private bool ThuongHieuExists(int id)
        {
            //throw new NotImplementedException();
            return _context.ThuongHieus.Any(e => e.id == id);
        }

        //Xoa thuong hieu
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var thuonghieu = await _context.ThuongHieus.FindAsync(id);
            if (thuonghieu == null)
            {
                return NotFound();
            }

            _context.ThuongHieus.Remove(thuonghieu);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
