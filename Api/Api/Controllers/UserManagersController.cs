using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Data;
using Api.Models;
namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserManagersController : ControllerBase
    {
        private readonly UserManager<UserModel> _userManager;
        private readonly DataContext _context;
        public UserManagersController(DataContext context, UserManager<UserModel> userManager)
        {
            this._context = context;
            this._userManager = userManager;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> Gets()
        {
            return await _userManager.Users.ToListAsync();
        }
    }
}
