using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
	public class UserModel
	{
        [Key]
        public int idUser { get; set; }

        [Required]
        public string userName { get; set; }

        [Required]
        public string tenUser { get; set; }

        [Required, Phone]
        public string sdt { get; set; }

        [Required]
        public string diaChi { get; set; }

        [Required, DataType(DataType.Password)]
        public string password { get; set; }

        public string quyen { get; set; } = "User";
    }
}
