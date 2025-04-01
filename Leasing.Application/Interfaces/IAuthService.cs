using Leasing.Application.Dtos;
using Leasing.Domain.Entities;
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
        //Task<User> GetUserByEmailAsync(string email);
        //Task<User> GetUserByPhoneAsync(string phone);
        //Task<(bool Success, string Token)> AuthenticateUserAsync(string phone);
        Task<User> GetUserByIdAsync(int id); // New method
        Task UpdateUserAsync(User user); // New method

        Task<(bool Success, string Message, string TempToken, User User)> LoginWithUsernameAsync(string username, string password);
        Task<(bool Success, string Message, string Otp)> SendOtpToBothAsync(int userId);
        Task<(bool Success, string Message, string Token)> VerifyOtpForLoginAsync(int userId, string otp);
        Task<(bool Success, string Message, User User)> RegisterMstcAdminAsync(string username, string password, string email, string phone, string name, string roBo, List<string> permissions); // New method

    }
}
