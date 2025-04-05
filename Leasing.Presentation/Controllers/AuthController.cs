using Leasing.Application;
using Leasing.Application.Interfaces;
using Leasing.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Security.Claims;

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
            var(success, isNewUser, role, token,email,name,reg_no) = await _authService.VerifyOtpAsync(request.Phone, request.OtpCode);
            if (success)
            {
                if (!role.Equals("user", StringComparison.CurrentCultureIgnoreCase))
                {

                    return BadRequest(new { Message = "Invalid Credentials", status = 500 }); ;
                }
                if (!isNewUser)
                {
                    return Ok(new { Message = "User already exists", isNewUser = false, status = false, Token = token, email,name,  reg_no });
                }
                
                    

              
                return Ok(new { Message = "OTP verified", IsNewUser = isNewUser, Role = role, status = true, email, name});
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
            return success ? Ok(new { Message = "Registration completed", RegistrationNumber = registrationNumber, Token = token, email = request.Email, name = request.Name }) : BadRequest(new { Message = "Registration failed. Verify OTP and email first or user already registered." });
        }

        [HttpPost("login/username")]
        public async Task<IActionResult> LoginWithUsername([FromBody] UsernameLoginRequest request)
        {
            var (success, message, tempToken, user) = await _authService.LoginWithUsernameAsync(request.Username, request.Password);
            if (!success)
            {
                return StatusCode(500, new { Message = message });
                //return BadRequest(new { Message = message });
            }

            // Send OTP to both email and mobile
            var (otpSuccess, otpMessage, otp) = await _authService.SendOtpToBothAsync(user.Id);
            if (!otpSuccess)
            {
                return StatusCode(500, new { Message = otpMessage });
            }

            return Ok(new { Message = message, TempToken = tempToken, UserId = user.Id, OtpSent = true });
        }

        [HttpPost("verify-login-otp")]
        public async Task<IActionResult> VerifyLoginOtp([FromBody] VerifyLoginOtpRequest request)
        {
            var (success, message, token) = await _authService.VerifyOtpForLoginAsync(request.UserId, request.Otp);
            if (!success)
            {
                return BadRequest(new { Message = message });
            }
            return Ok(new { Message = message, Token = token });
        }

        [HttpPost("register/mstc-admin")]
        //[Authorize(Roles = "MSTC")]
        public async Task<IActionResult> RegisterMstcAdmin([FromBody] RegisterMstcAdminRequest request)
        {
            // Optional: Check permissions of the requester
            var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var requester = await _authService.GetUserByIdAsync(requesterId);
            if (!requester.Permissions.Contains("ManageUsers"))
            {
                return Forbid("You do not have permission to register MSTC admins");
            }

            var (success, message, user) = await _authService.RegisterMstcAdminAsync(
                request.Username,
                request.Password,
                request.Email,
                request.Phone,
                request.Name,
                request.RoBo,
                request.Permissions
            );

            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return Ok(new
            {
                Message = message,
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Phone,
                    user.Name,
                    user.Role,
                    user.RoBo,
                    user.Permissions,
                    user.RegistrationNumber
                }
            });
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
    public class UpdateProfileRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
    public class UsernameLoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    // New Request Model for OTP Verification
    public class VerifyLoginOtpRequest
    {
        public int UserId { get; set; }
        public string Otp { get; set; }
    }

    public class RegisterMstcAdminRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Name { get; set; }
        public string RoBo { get; set; }
        public List<string> Permissions { get; set; }
    }
}