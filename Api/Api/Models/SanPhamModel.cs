using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
	public class SanPhamModel
	{
        [Key]
        [Required]
        public int idSP { get; set; }

        [Required]
        public string tenSP { get; set; }

        public string moTa { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal giaBan { get; set; }

        //public decimal ? khuyenMai { get; set; }

        public int soLuong { get; set; }

        public int ? idThuongHieu { get; set; }
        [ForeignKey("idThuongHieu")]
        public virtual ThuongHieuModel ThuongHieu { get; set; }

        public int ? idDanhMuc { get; set; }
        [ForeignKey("idDanhMuc")]
        public virtual DanhMucModel DanhMuc { get; set; }

		public string image {  get; set; }
	}
}
