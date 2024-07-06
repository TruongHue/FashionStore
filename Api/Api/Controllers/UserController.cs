using Microsoft.AspNetCore.Mvc;
using System.Data;
using Api.Data;
using Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace Api.Controllers
{
	[ApiController]
	[Route("[controller]")]

	public class UserController : ControllerBase
	{
		
		private readonly DataContext _context;

		public UserController(DataContext context)
		{
			_context = context;
		}

        //Lấy danh sách User
        [HttpGet]
		public IEnumerable<UserModel> Get()
		{
			return _context.Users.OrderBy(u => u.idUser).ToList();
		}

        //Lấy User theo số điện thoại
        [HttpGet("{sdt}")]
		public UserModel Get([FromQuery] string sdt)
		{
			return _context.Users.Where(UserModel => UserModel.sdt == sdt).FirstOrDefault();
		}

        //Kiểm tra đăng nhập
        [HttpPost("DangNhap")]
        public IActionResult DangNhap([FromQuery] string userName, [FromQuery] string password)
        {
            var user = _context.Users.FirstOrDefault(u => u.userName == userName && u.password == password);

            if (user == null)
            {
                return NotFound("Tên đăng nhập hoặc mật khẩu không đúng.");
            }

            // Lưu thông tin đăng nhập vào session
            HttpContext.Session.SetInt32("IdUser", user.idUser);
            HttpContext.Session.SetString("UserName", user.userName);
            HttpContext.Session.SetString("Quyen", user.quyen);

            return Ok(user);
        }

        [HttpGet("KiemTraQuyen")]
        public IActionResult CheckAdminAccess()
        {
            var quyen = HttpContext.Session.GetString("Quyen");

            if (quyen == "Admin")
            {
                return Ok("Người dùng có quyền admin!");
            }
            else
            {
                return StatusCode(404, "Người dùng không có quyền admin!");
            }
        }

        // Đăng xuất
        [HttpPost("DangXuat")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear(); // Xóa tất cả các giá trị trong session

            return Ok("Đã đăng xuất thành công.");
        }

        /*[HttpGet("CurrentUser")]
        public IActionResult GetCurrentUser()
        {
            var userId = HttpContext.Session.GetString("UserId");
            var userName = HttpContext.Session.GetString("UserName");

            if (userId == null || userName == null)
            {
                return NotFound("Chưa đăng nhập.");
            }

            // Trả về thông tin người dùng hiện tại từ session
            var currentUser = new UserModel
            {
                idUser = int.Parse(userId),
                userName = userName
            };

            return Ok(currentUser);
        }*/

        //Thêm tài khoản / Đăng ký
        [HttpPost("DangKy")]
		public UserModel Post([FromQuery] UserModel Model)
		{
			var user = new UserModel();
			{
				user.tenUser = Model.tenUser;
				user.diaChi = Model.diaChi;
				user.sdt = Model.sdt;
				user.userName = Model.userName;
				user.password = Model.password;
			}
			_context.Users.Add(user);
			_context.SaveChanges();
			return user;
		}

		//Sửa các thông tin khác trừ password
		[HttpPut("ChangeInfo/{sdt}")]
		public async Task<IActionResult> PutInfo(string sdt, [FromQuery] string newSdt, [FromQuery] string newTenUser, [FromQuery] string newDiaChi, [FromQuery] string newUserName)
		{
			if (sdt == null)
			{
				return NotFound();
			}

            UserModel user = _context.Users.Where(u => u.sdt == sdt).FirstOrDefault();
            if (user == null)
			{
				return NotFound();
			}

			user.tenUser = newTenUser;
			user.sdt = newSdt;
            user.diaChi = newDiaChi;
            user.userName = newUserName;
  
			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException) when (!UserExists(user.sdt))
			{
				return NotFound();
			}

			return NoContent();
		}

        //Đổi password
        [HttpPut("ChangePassword/{sdt}")]
        public async Task<IActionResult> PutPassword(string sdt, [FromQuery] string password)
        {
            if (sdt == null)
            {
                return NotFound();
            }

            UserModel user = _context.Users.Where(u => u.sdt == sdt).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            user.password = password;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!UserExists(sdt))
            {
                return NotFound();
            }

            return NoContent();
        }

        private bool UserExists(string sdt)
		{
			//throw new NotImplementedException();
            return _context.Users.Any(u => u.sdt == sdt);
        }

		//Xóa tài khoản
        [HttpDelete("Delete/{sdt}")]
		public async Task<IActionResult> Delete(string sdt)
		{
            UserModel user = _context.Users.Where(u => u.sdt == sdt).FirstOrDefault();
            if (user == null)
			{
				return NotFound();
			}

			_context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
		}

	}
}
