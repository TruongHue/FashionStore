using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class DanhMucModel
    {
        [Key]
        public int id { get; set; }

        [Required]
        public string tenDM { get; set; }

        public string moTa { get; set; }
    }
}
