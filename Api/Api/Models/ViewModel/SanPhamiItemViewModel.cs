using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Api.Models.ViewModel
{
    public class SanPhamiItemViewModel
    {
        public int idSP { get; set; }

        public string tenSP { get; set; }

        public string ? moTa { get; set; }

        public decimal ? giaBan { get; set; }

        //public decimal ? khuyenMai { get; set; }

        public int soLuong { get; set; }

        public string tenThuongHieu { get; set; }

        public string tenDanhMuc { get; set; }

        public string image { get; set; }
    }
}
