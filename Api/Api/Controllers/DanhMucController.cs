using Api.Data;
using Api.Models;
using Api.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DanhMucController : Controller
    {
        private readonly DataContext _context;

        public DanhMucController(DataContext context)
        {
            _context = context;
        }

        //public int id { get; private set; }

        //Lay danh sach danh muc
        [HttpGet]
        public async Task<IEnumerable<DanhMucModel>> Get()
        {
            return await _context.DanhMucs.OrderBy(p => p.id).ToListAsync();
        }

        //Lay 1 danh muc
        /*[HttpGet("{id}")]
        public async Task<ActionResult<DanhMucModel>> Get([FromQuery] int id)
        {
            var danhmuc = await _context.DanhMucs.FindAsync(id);
            if (danhmuc == null)
            {
                return NotFound();
            }
            return danhmuc;
            //return _context.DanhMucs.Where(d => d.id == id).FirstOrDefault();
        }*/

        //Lay san pham trong danh muc
        [HttpGet("{id}/sanpham")]
        public async Task<ActionResult<IEnumerable<SanPhamiItemViewModel>>> GetLoaiIdProducts(int id)
        {
            var danhMuc = await _context.DanhMucs.FindAsync(id);
            if (danhMuc == null)
            {
                return NotFound();
            }

            var sanPhams = await _context.SanPhams.Where(s => s.idDanhMuc == id).Include(s => s.ThuongHieu)
            .Select(s => new SanPhamiItemViewModel
            {
                idSP = s.idSP,
                tenSP = s.tenSP,
                moTa = s.moTa,
                giaBan = s.giaBan,
                soLuong = s.soLuong,
                tenThuongHieu = s.ThuongHieu.tenTH,
                tenDanhMuc = danhMuc.tenDM,
                image = s.image
            }).ToListAsync();

            return sanPhams;
        }

        //Them danh muc
        [HttpPost]
        public async Task<ActionResult<DanhMucModel>> Post([FromQuery] DanhMucModel Model)
        {
            _context.DanhMucs.Add(Model);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = Model.id }, Model);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, DanhMucModel Model)
        {
            if (id != Model.id)
            {
                return BadRequest();
            }

            var danhMuc = await _context.DanhMucs.FindAsync(id);
            if (danhMuc == null)
            {
                return NotFound();
            }

            danhMuc.moTa = Model.moTa;
            danhMuc.tenDM = Model.tenDM;
            _context.DanhMucs.Update(danhMuc);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!DanhMucExists(id))
            {
                return NotFound();
            }

            return NoContent();
        }

        private bool DanhMucExists(int id)
        {
            //throw new NotImplementedException();
            return _context.DanhMucs.Any(e => e.id == id);
        }

        //Xoa danh muc
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var danhMuc = await _context.DanhMucs.FindAsync(id);
            if (danhMuc == null)
            {
                return NotFound();
            }

            _context.DanhMucs.Remove(danhMuc);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
