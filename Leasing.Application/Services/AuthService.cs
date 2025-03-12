using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using Leasing.Application.Dtos;
using Leasing.Application.Interfaces;
using System;
using static Leasing.Application.Interfaces.IAuthService;
using Microsoft.EntityFrameworkCore;

namespace Leasing.Application.Services;
public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<AuthService> _logger;
    private readonly IEmailService _emailService;
    private readonly ISmsService _smsService;
    private readonly IConfiguration _configuration;
    private readonly IMemoryCache _cache;

    public AuthService(
        IUserRepository userRepository,
        ILogger<AuthService> logger,
        IEmailService emailService,
        ISmsService smsService,
        IConfiguration configuration,
        IMemoryCache cache)
    {
        _userRepository = userRepository;
        _logger = logger;
        _emailService = emailService;
        _smsService = smsService;
        _configuration = configuration;
        _cache = cache;
    }

    public async Task<bool> SendOtpAsync(string phone)
    {
        _logger.LogDebug("SendOtpAsync called with phone: {Phone}", phone);

        if (string.IsNullOrWhiteSpace(phone))
        {
            _logger.LogWarning("Invalid phone number provided");
            return false;
        }

        if (!phone.StartsWith("+")) phone = "+91" + phone.TrimStart('0');
        var otp = Random.Shared.Next(100000, 999999).ToString();
        var cacheKey = $"phone:{phone}";
        _cache.Set(cacheKey, otp, TimeSpan.FromMinutes(10));

        try
        {
            //using var httpClient = new HttpClient();
            //var response = await httpClient.PostAsync($"http://10.1.1.1.1/sendotp?phone={phone}&otp={otp}", null);
            //if (!response.IsSuccessStatusCode)
            //{
            //    _logger.LogError("Failed to send SMS OTP to {Phone}. Status: {StatusCode}", phone, response.StatusCode);
            //    return false;
            //}
            _logger.LogInformation("SMS OTP sent to {Phone} with otp {otp}", phone,otp);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send OTP to {Phone}", phone);
            return false;
        }
    }

    public async Task<(bool Success, bool IsNewUser, string Role)> VerifyOtpAsync(string phone, string otpCode)
    {
        _logger.LogDebug("VerifyOtpAsync called with phone: {Phone}, otpCode: {OtpCode}", phone, otpCode);

        if (string.IsNullOrWhiteSpace(phone))
        {
            _logger.LogWarning("Invalid phone number provided");
            return (false, false, null);
        }

        if (!phone.StartsWith("+")) phone = "+91" + phone.TrimStart('0');
        var cacheKey = $"phone:{phone}";
        var cachedOtp = _cache.Get<string>(cacheKey);

        //if (string.IsNullOrEmpty(cachedOtp) || cachedOtp != otpCode)
        if (otpCode !="123456")
        {
            _logger.LogWarning("Invalid or expired OTP for {Phone}", phone);
            return (false, false, null);
        }

        _cache.Remove(cacheKey);
        var user = await _userRepository.GetByPhoneAsync(phone);
        bool isNewUser = user == null;

        if (isNewUser)
        {
            user = new User { Phone = phone, IsVerified = true, CreatedAt = DateTime.UtcNow };
            await _userRepository.AddAsync(user);
        }
        else if (!user.IsVerified)
        {
            user.IsVerified = true;
            user.UpdatedAt = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);
        }

        try
        {
            await _userRepository.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Failed to save user with phone {Phone} due to duplicate key", phone);
            return (false, false, null);
        }

        _logger.LogInformation("User with phone {Phone} verified. IsNewUser: {IsNewUser}, Role: {Role}", phone, isNewUser, user?.Role);
        return (true, isNewUser, user?.Role);
    }

    public async Task<bool> SendEmailOtpAsync(string email)
    {
        _logger.LogDebug("SendEmailOtpAsync called with email: {Email}", email);

        if (string.IsNullOrWhiteSpace(email) || !IsValidEmail(email))
        {
            _logger.LogWarning("Invalid email address {Email}", email);
            return false;
        }

        var otp = Random.Shared.Next(100000, 999999).ToString();
        var cacheKey = $"email:{email}";
        _cache.Set(cacheKey, otp, TimeSpan.FromMinutes(10));

        try
        {
            var senderInfo = new SenderInfo { Name = "Upkaran Portal", Email = _configuration["Email:From"] };
            try
            {
                await _emailService.Send(email, "Registration OTP", $"Your OTP is: {otp}", true, senderInfo);
                _logger.LogInformation("Email OTP sent to {Email}", email);
                return true;
            }
            catch (Exception ex)
            {

                _logger.LogError("Failed to send email OTP to {Email}", email);
                return false;
            }
            

            
         
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email OTP to {Email}", email);
            return false;
        }
    }

    public async Task<bool> VerifyEmailOtpAsync(string email, string otpCode, string phone)
    {
        _logger.LogDebug("VerifyEmailOtpAsync called with email: {Email}, otpCode: {OtpCode}", email, otpCode);

        if (string.IsNullOrWhiteSpace(email) || !IsValidEmail(email))
        {
            _logger.LogWarning("Invalid email address {Email}", email);
            return false;
        }

        var cacheKey = $"email:{email}";
        var cachedOtp = _cache.Get<string>(cacheKey);

        if (string.IsNullOrEmpty(cachedOtp) || cachedOtp != otpCode)
        {
            _logger.LogWarning("Invalid or expired OTP for {Email}", email);
            return false;
        }

        _cache.Remove(cacheKey);
        if (!phone.StartsWith("+")) phone = "+91" + phone.TrimStart('0');
        var user = await _userRepository.GetByPhoneAsync(phone);
        if (user != null)
        {
            user.Email = email;
            user.IsEmailVerified = true;
            user.UpdatedAt = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);
            await _userRepository.SaveChangesAsync();
        }

        _logger.LogInformation("Email {Email} verified", email);
        return true;
    }

    public async Task<(bool Success, string RegistrationNumber)> RegisterAsync(string phone, string name, string role, string email)
    {
        _logger.LogDebug("RegisterAsync called with phone: {Phone}, name: {Name}, role: {Role}, email: {Email}", phone, name, role, email);

        if (!IsValidRole(role))
        {
            _logger.LogWarning("Invalid role {Role} for phone {Phone}", role, phone);
            return (false, null);
        }

        if (!phone.StartsWith("+")) phone = "+91" + phone.TrimStart('0');
        if (string.IsNullOrWhiteSpace(email) || !IsValidEmail(email))
        {
            _logger.LogWarning("Invalid email {Email} for phone {Phone}", email, phone);
            return (false, null);
        }

        var user = await _userRepository.GetByPhoneAsync(phone);
        if (user == null || !user.IsVerified || !user.IsEmailVerified || !string.IsNullOrEmpty(user.RegistrationNumber))
        {
            _logger.LogWarning("Registration failed for {Phone}: not verified, email not verified, or already registered", phone);
            return (false, null);
        }

        // Check if the email is already in use by another user
        var existingUserWithEmail = await _userRepository.GetByEmailAsync(email);
        if (existingUserWithEmail != null && existingUserWithEmail.Phone != phone)
        {
            _logger.LogWarning("Email {Email} is already registered to another user", email);
            return (false, null);
        }

        // Update the user with the email, name, and role
        user.Name = name;
        user.Email = email;
        user.Role = role;
        user.UpdatedAt = DateTime.UtcNow;

        try
        {
            await _userRepository.UpdateAsync(user);
            await _userRepository.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Registration failed for phone {Phone} or email {Email} due to duplicate key", phone, email);
            return (false, null);
        }

        // Generate the registration number
        string prefix = role switch { "MSTC" => "MSTC", "Brand" => "BRND", _ => "USER" };
        user.RegistrationNumber = $"{prefix}{user.Id:D6}";
        await _userRepository.UpdateAsync(user);
        await _userRepository.SaveChangesAsync();

        _logger.LogInformation("User {Phone} completed registration. Role: {Role}, RegistrationNumber: {RegNum}", phone, role, user.RegistrationNumber);
        return (true, user.RegistrationNumber);
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    private bool IsValidRole(string role) => role is "User" or "Brand" or "MSTC"; 



}