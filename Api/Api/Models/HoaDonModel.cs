using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models
{
	public class HoaDonModel
	{
        [Key]
        [Required]
        public int idHD { get; set; }

        public string diaChi { get; set; }

        public int ? idUser { get; set; }
        [ForeignKey("idUser")]

        public virtual UserModel Users { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime ngayTao { get; set; }

        public string trangThaiHD { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal tongTien { get; set; }

        public virtual ICollection<ChiTietHoaDonModel> ChiTietHoaDons { get; set; }

        //public int Paymenttype { get; set; }

        //public int PaymentStatus { get; set; }
    }
}
