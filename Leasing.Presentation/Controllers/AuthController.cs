using Microsoft.AspNetCore.Mvc;
using Leasing.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static Leasing.Application.Interfaces.IAuthService;

namespace Leasing.Presentation.Controllers;
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

    [HttpPost("register/send-otp")]
    public async Task<IActionResult> SendOtpForRegistration([FromBody] OtpRequest request)
    {
        await _authService.SendOtpForRegistrationAsync(request.Identifier, request.OtpType);
        return Ok("OTP sent for registration.");
    }

    [HttpPost("register/verify-otp")]
    public async Task<IActionResult> VerifyOtpAndRegister([FromBody] VerifyOtpRequest request)
    {
        var user = await _authService.VerifyOtpAndRegisterAsync(
            request.Mobile_Email, request.Otp, request.OtpType,
            new UserDetailsRequest { Name = request.Name, Email = request.Email, BusinessName = request.BusinessName });
        return Ok(user);
    }

    [HttpPost("login/send-otp")]
    public async Task<IActionResult> SendOtpForLogin([FromBody] OtpRequest request)
    {
        await _authService.SendOtpForLoginAsync(request.Identifier, request.OtpType);
        return Ok("OTP sent for login.");
    }

    [HttpPost("login/verify-otp")]
    public async Task<IActionResult> VerifyOtpAndLogin([FromBody] VerifyOtpRequest request)
    {
        var token = await _authService.VerifyOtpAndLoginAsync(request.Mobile_Email, request.Otp, request.OtpType);
        if (token == "jwt-token-placeholder")
            return Ok(new { Token = GenerateJwtToken(request.Mobile_Email) });
        return Unauthorized();
    }

    private string GenerateJwtToken(string identifier)
    {
        var claims = new[] { new Claim(ClaimTypes.Name, identifier) };
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

    [HttpGet("test-log")]
    public IActionResult TestLog()
    {
        _logger.LogInformation("Test log entry from AuthController");
        return Ok("Logged");
    }

    

}

public class OtpRequest { public string Identifier { get; set; } public string OtpType { get; set; } }

public class VerifyOtpRequest
{
    public string Mobile_Email { get; set; } // e.g. emialid, mobile number
    public string Otp { get; set; }
    public string OtpType { get; set; }  // sent on mail, or mobile 
    public string Name { get; set; }
    public string Email { get; set; }
    public string BusinessName { get; set; }
}