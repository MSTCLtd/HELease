using Leasing.Application.Dtos;
using Leasing.Domain.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Leasing.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetVurrentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            var username = User.FindFirst(ClaimTypes.Name)?.Value;
            if (string.IsNullOrEmpty(username))
                return Unauthorized();

            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null)
                return NotFound();

            return Ok(new UserDto { Id = user.Id, Username = user.Name });
        }
    }
}
