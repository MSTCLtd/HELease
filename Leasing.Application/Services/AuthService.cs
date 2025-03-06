using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using Leasing.Application.Dtos;
using Leasing.Application.Interfaces;
using System;
using static Leasing.Application.Interfaces.IAuthService;

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

    public async Task SendOtpForRegistrationAsync(string identifier, string otpType)
    {
        User user = otpType == "email"
            ? await _userRepository.GetByEmailAsync(identifier)
            : await _userRepository.GetByMobileNumberAsync(identifier);

        if (user != null)
        {
            _logger.LogWarning("Registration attempted for existing {OtpType}: {Identifier}", otpType, identifier);
            throw new Exception("User already exists.");
        }

        var otp = new Random().Next(100000, 999999).ToString();
        _cache.Set($"{otpType}:{identifier}", otp, TimeSpan.FromMinutes(15));

        _logger.LogInformation("Registration OTP {Otp} sent to {OtpType}: {Identifier}", otp, otpType, identifier);
        if (otpType == "email")
        {
            var senderInfo = new SenderInfo { Name = "Upkaran Portal", Email = _configuration["Email:From"] };
            await _emailService.Send(identifier, "Registration OTP", $"Your OTP is: {otp}", false, senderInfo);
        }
        else
        {
            await _smsService.SendAsync(identifier, $"Your Upkaran Portal registration OTP is: {otp}");
        }
    }

    public async Task<UserDto> VerifyOtpAndRegisterAsync(string identifier, string otp, string otpType)
    {
        var cachedOtp = _cache.Get<string>($"{otpType}:{identifier}");
        if (cachedOtp != otp)
        {
            _logger.LogWarning("Invalid OTP for registration {OtpType}: {Identifier}", otpType, identifier);
            throw new Exception("Invalid OTP");
        }

        var user = new User
        {
            Username = identifier.Split('@')[0], // Simple username derivation
            Email = otpType == "email" ? identifier : null,
            MobileNumber = otpType == "mobile" ? identifier : null
        };
        await _userRepository.AddAsync(user);

        _logger.LogInformation("User registered with {OtpType}: {Identifier}", otpType, identifier);
        _cache.Remove($"{otpType}:{identifier}");
        return new UserDto { Id = user.Id, Username = user.Username };
    }

    public async Task SendOtpForLoginAsync(string identifier, string otpType)
    {
        User user = otpType == "email"
            ? await _userRepository.GetByEmailAsync(identifier)
            : await _userRepository.GetByMobileNumberAsync(identifier);

        if (user == null)
        {
            _logger.LogWarning("Login attempted for unknown {OtpType}: {Identifier}", otpType, identifier);
            return; // Silent fail for security
        }

        var otp = new Random().Next(100000, 999999).ToString();
        _cache.Set($"{otpType}:{identifier}", otp, TimeSpan.FromMinutes(15));

        _logger.LogInformation("Login OTP {Otp} sent to {OtpType}: {Identifier}", otp, otpType, identifier);
        if (otpType == "email")
        {
            var senderInfo = new SenderInfo { Name = "Upkaran Portal", Email = _configuration["Email:From"] };
            await _emailService.Send(identifier, "Login OTP", $"Your OTP is: {otp}", false, senderInfo);
        }
        else
        {
            await _smsService.SendAsync(identifier, $"Your Upkaran Portal login OTP is: {otp}");
        }
    }

    public async Task<string> VerifyOtpAndLoginAsync(string identifier, string otp, string otpType)
    {
        var cachedOtp = _cache.Get<string>($"{otpType}:{identifier}");
        if (cachedOtp != otp)
        {
            _logger.LogWarning("Invalid OTP for login {OtpType}: {Identifier}", otpType, identifier);
            throw new Exception("Invalid OTP");
        }

        User user = otpType == "email"
            ? await _userRepository.GetByEmailAsync(identifier)
            : await _userRepository.GetByMobileNumberAsync(identifier);

        if (user == null)
        {
            _logger.LogWarning("Login attempted for unknown {OtpType}: {Identifier}", otpType, identifier);
            throw new Exception("User not found after OTP verification");
        }

        _logger.LogInformation("User logged in with {OtpType}: {Identifier}", otpType, identifier);
        _cache.Remove($"{otpType}:{identifier}");
        return "jwt-token-placeholder"; // Replace with JWT generation
    }

    public async Task<UserDto> VerifyOtpAndRegisterAsync(string identifier, string otp, string otpType, UserDetailsRequest details)
    {
        var cachedOtp = _cache.Get<string>($"{otpType}:{identifier}");
        if (cachedOtp != otp)
        {
            _logger.LogWarning("Invalid OTP for registration {OtpType}: {Identifier}", otpType, identifier);
            throw new Exception("Invalid OTP");
        }

        var user = new User
        {
            Username = details.Name,
            Email = otpType == "email" ? identifier : details.Email,
            MobileNumber = otpType == "mobile" ? identifier : null,
            BusinessName = details.BusinessName
        };
        await _userRepository.AddAsync(user);

        _logger.LogInformation("User registered with {OtpType}: {Identifier}, Business: {BusinessName}", otpType, identifier, details.BusinessName);
        _cache.Remove($"{otpType}:{identifier}");
        return new UserDto { Id = user.Id, Username = user.Username };
    }
}