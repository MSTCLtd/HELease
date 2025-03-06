using Leasing.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Application.Interfaces
{
    public interface IAuthService
    {
        Task SendOtpForRegistrationAsync(string identifier, string otpType);
        Task<UserDto> VerifyOtpAndRegisterAsync(string identifier, string otp, string otpType, UserDetailsRequest details);
        Task SendOtpForLoginAsync(string identifier, string otpType);
        Task<string> VerifyOtpAndLoginAsync(string identifier, string otp, string otpType);
        
        public class UserDetailsRequest { public string Name { get; set; } public string Email { get; set; } public string BusinessName { get; set; } }
    }
}
