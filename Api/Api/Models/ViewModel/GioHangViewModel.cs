namespace Api.Models.ViewModel
{
    public class GioHangViewModel
    {
        public string tenSP { get; set; }

        public int soLuong { get; set; }

        public decimal gia { get; set; }

        public string image { get; set; }

        public decimal tongTien
        {
            get { return soLuong * gia; }
        }
    }
}
