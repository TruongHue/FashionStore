using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class ThuongHieuModel
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string tenTH { get; set; }

        public string moTa { get; set; }
    }
}
