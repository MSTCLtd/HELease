using Leasing.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Leasing.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IConfiguration _config;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, IConfiguration config, ILogger<AuthController> logger)
        {
            _authService = authService; 
            _config = config;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            _logger.LogInformation("Login attempt for user: {Username}", request.Username);
            try
            {
                var token = await _authService.LoginAsync(request.Username, request.Password);
                if (token == "jwt-token-placeholder")
                {
                    var jwtToken = GenerateJwtToken(request.Username);
                    _logger.LogInformation("User {Username} logged in successfully", request.Username);
                    return Ok(new { Token = jwtToken });
                }
                _logger.LogWarning("Login failed for user: {Username}", request.Username);
                return Unauthorized();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login for user: {Username}", request.Username);
                return StatusCode(500);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var user = await _authService.RegisterAsync(request.Username, request.Password);
            return Ok(user);
        }

        private string GenerateJwtToken(string username)
        {
            var claims = new[] { new Claim(ClaimTypes.Name, username) };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class LoginRequest { public string Username { get; set; } public string Password { get; set; } }
    public class RegisterRequest { public string Username { get; set; } public string Password { get; set; } }
}
