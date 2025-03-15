using Leasing.Application;
using Leasing.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace Leasing.Presentation.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register/send-mobile-otp")]
        public async Task<IActionResult> SendOtp([FromBody] SendOtpRequest request)
        {
            var success = await _authService.SendOtpAsync(request.Phone);
            return success ? Ok(new { Message = "OTP sent to mobile" }) : StatusCode(500, new { Message = "Failed to send OTP" });
        }

        [HttpPost("register/verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            var(success, isNewUser, role, token) = await _authService.VerifyOtpAsync(request.Phone, request.OtpCode);
            if (success)
            {
                if (!isNewUser)
                {
                    return Ok(new { Message = "User already exists", isNewUser = false, status = false, Token = token });
                }
                return Ok(new { Message = "OTP verified", IsNewUser = isNewUser, Role = role, status = true });
            }
            return BadRequest(new { Message = "Invalid or expired OTP", status = false });
        }

        [HttpPost("register/send-email-otp")]
        public async Task<IActionResult> SendEmailOtp([FromBody] SendEmailOtpRequest request)
        {
            var success = await _authService.SendEmailOtpAsync(request.Email);
            return success ? Ok(new { Message = "OTP sent to email" }) : StatusCode(500, new { Message = "Failed to send email OTP" });
        }

        [HttpPost("register/verify-email-otp")]
        public async Task<IActionResult> VerifyEmailOtp([FromBody] VerifyEmailOtpRequest request)
        {
            var success = await _authService.VerifyEmailOtpAsync(request.Email, request.OtpCode, request.Phone);
            return success ? Ok(new { Message = "Email OTP verified", status = true }) : BadRequest(new { Message = "Invalid or expired email OTP", status = false });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var (success, registrationNumber, token) = await _authService.RegisterAsync(request.Phone, request.Name, request.Role, request.Email);
            return success ? Ok(new { Message = "Registration completed", RegistrationNumber = registrationNumber, Token = token }) : BadRequest(new { Message = "Registration failed. Verify OTP and email first or user already registered." });
        }
    }

    public class SendOtpRequest
    {
        public string Phone { get; set; }
    }

    public class VerifyOtpRequest
    {
        public string Phone { get; set; }
        public string OtpCode { get; set; }
    }

    public class SendEmailOtpRequest
    {
        public string Email { get; set; }
    }

    public class VerifyEmailOtpRequest
    {
        public string Email { get; set; }
        public string OtpCode { get; set; }
        public string Phone { get; set; }
    }

    public class RegisterRequest
    {
        public string Phone { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
    }
}