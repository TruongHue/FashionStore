using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class ChiTietHoaDonModel
    {
        [Key]
        public int idCTHD { get; set; }

        public int ? idHD { get; set; }
        [ForeignKey("iHD")]
        public virtual HoaDonModel HoaDon { get; set; }

        public int idSP { get; set; }
        [ForeignKey("idSanPham")]
        public virtual SanPhamModel SanPham { get; set; }

        public int soLuong { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal ? giaBan { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal ? thanhTien { get; set; }
    }
}
