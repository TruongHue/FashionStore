using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
	public class GioHangModel
	{
        [Key]
        [Required]
        public int idGioHang { get; set; }

        public int idUser { get; set; }
        [ForeignKey("idUser")]
        public virtual UserModel User { get; set; }

        [Required]
        public int ? idSP { get; set; }
        [ForeignKey("idSP")]
        public virtual SanPhamModel SanPham { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal gia { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int soLuong { get; set; }
    }
}
