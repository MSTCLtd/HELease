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
        Task<bool> SendOtpAsync(string phone);
        //Task<(bool Success, bool IsNewUser, string Role)> VerifyOtpAsync(string phone, string otpCode);
        Task<(bool Success, bool IsNewUser, string Role, string Token, string email, string name)> VerifyOtpAsync(string phone, string otpCode); // Updated
        Task<bool> SendEmailOtpAsync(string email);
        Task<bool> VerifyEmailOtpAsync(string email, string otpCode, string phone);
        Task<(bool Success, string RegistrationNumber, string Token)> RegisterAsync(string phone, string name, string role, string email);

    }
}
