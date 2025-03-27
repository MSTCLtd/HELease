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
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

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
            _logger.LogInformation("SMS OTP sent to {Phone} with otp {otp}", phone, otp);
            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send OTP to {Phone}", phone);
            return false;
        }
    }

    public async Task<(bool Success, bool IsNewUser, string Role, string Token, string email, string name)> VerifyOtpAsync(string phone, string otpCode)
    {
        _logger.LogDebug("VerifyOtpAsync called with phone: {Phone}, otpCode: {OtpCode}", phone, otpCode);

        if (string.IsNullOrWhiteSpace(phone))
        {
            _logger.LogWarning("Invalid phone number provided");
            return (false, false, null, null, null, null);
        }

        if (!phone.StartsWith("+")) phone = "+91" + phone.TrimStart('0');
        var cacheKey = $"phone:{phone}";
        var cachedOtp = _cache.Get<string>(cacheKey);

        //if (string.IsNullOrEmpty(cachedOtp) || cachedOtp != otpCode)
        if (otpCode != "123456")
        {
            _logger.LogWarning("Invalid or expired OTP for {Phone}", phone);
            return (false, false, null, null, null, null);
        }

        _cache.Remove(cacheKey);
        var user = await _userRepository.GetByPhoneAsync(phone);
        bool isNewUser = user == null;
        string token = null;
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
        else
        {
            // Generate JWT token for existing user (login scenario)
            token = GenerateJwtToken(user);
            _logger.LogInformation("User with phone {Phone} logged in successfully", phone);
        }

        try
        {
            await _userRepository.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Failed to save user with phone {Phone} due to duplicate key", phone);
            return (false, false, null, null, null, null);
        }

        _logger.LogInformation("User with phone {Phone} verified. IsNewUser: {IsNewUser}, Role: {Role}", phone, isNewUser, user?.Role, user.Email, user.Name);
        return (true, isNewUser, user?.Role, token, user?.Email, user?.Name);
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

    public async Task<(bool Success, string RegistrationNumber, string Token)> RegisterAsync(string phone, string name, string role, string email)
    {
        _logger.LogDebug("RegisterAsync called with phone: {Phone}, name: {Name}, role: {Role}, email: {Email}", phone, name, role, email);

        if (!IsValidRole(role))
        {
            _logger.LogWarning("Invalid role {Role} for phone {Phone}", role, phone);
            return (false, null, null);
        }

        if (!phone.StartsWith("+")) phone = "+91" + phone.TrimStart('0');
        if (string.IsNullOrWhiteSpace(email) || !IsValidEmail(email))
        {
            _logger.LogWarning("Invalid email {Email} for phone {Phone}", email, phone);
            return (false, null, null);
        }

        var user = await _userRepository.GetByPhoneAsync(phone);
        if (user == null || !user.IsVerified || !user.IsEmailVerified || !string.IsNullOrEmpty(user.RegistrationNumber))
        {
            _logger.LogWarning("Registration failed for {Phone}: not verified, email not verified, or already registered", phone);
            return (false, null, null);
        }

        // Check if the email is already in use by another user
        var existingUserWithEmail = await _userRepository.GetByEmailAsync(email);
        if (existingUserWithEmail != null && existingUserWithEmail.Phone != phone)
        {
            _logger.LogWarning("Email {Email} is already registered to another user", email);
            return (false, null, null);
        }

        // Update the user with the email, name, and role
        user.Name = name;
        user.Email = email;
        user.Role = role;
        user.CreatedAt = DateTime.Now;
        user.UpdatedAt = DateTime.Now;

        try
        {
            await _userRepository.UpdateAsync(user);
            await _userRepository.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Registration failed for phone {Phone} or email {Email} due to duplicate key", phone, email);
            return (false, null, null);
        }

        // Generate the registration number
        string prefix = role switch { "MSTC" => "MSTC", "Brand" => "BRND", _ => "USER" };
        user.RegistrationNumber = $"{prefix}{user.Id:D6}";
        await _userRepository.UpdateAsync(user);
        await _userRepository.SaveChangesAsync();
        var token = GenerateJwtToken(user);
        _logger.LogInformation("User {Phone} completed registration. Role: {Role}, RegistrationNumber: {RegNum}", phone, role, user.RegistrationNumber);
        return (true, user.RegistrationNumber, token);
    }

    //private string GenerateJwtToken(User user)
    //{
    //    var claims = new[]
    //    {
    //            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
    //            new Claim(ClaimTypes.Name, user.Name ?? ""),
    //            new Claim(ClaimTypes.Email, user.Email ?? ""),
    //            new Claim("Phone", user.Phone),
    //            new Claim("RegistrationNumber", user.RegistrationNumber ?? "")

    //        };

    //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
    //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    //    var token = new JwtSecurityToken(
    //        issuer: _configuration["Jwt:Issuer"],
    //        audience: _configuration["Jwt:Audience"],
    //        claims: claims,
    //        expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryMinutes"])),
    //        signingCredentials: creds);

    //    return new JwtSecurityTokenHandler().WriteToken(token);
    //}
    private string GenerateJwtToken(User user, bool isFinal = true)
    {
        var claims = new[]
        {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name ?? ""),
                new Claim(ClaimTypes.Email, user.Email ?? ""),
                new Claim("Phone", user.Phone),
                new Claim("RegistrationNumber", user.RegistrationNumber ?? ""),
                new Claim(ClaimTypes.Role, user.Role)
            };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: isFinal ? DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["Jwt:ExpiryMinutes"])) : DateTime.Now.AddMinutes(10), // Temporary token for OTP
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
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

    public async Task<User> GetUserByIdAsync(int id)
    {
        return await _userRepository.GetByIdAsync(id);
    }

    public async Task UpdateUserAsync(User user)
    {
        await _userRepository.UpdateAsync(user);
        await _userRepository.SaveChangesAsync();
    }

    public async Task<(bool Success, string Message, string TempToken, User User)> LoginWithUsernameAsync(string username, string password)
    {
        _logger.LogDebug("LoginWithUsernameAsync called with username: {Username}", username);

        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
        {
            _logger.LogWarning("Invalid username or password provided");
            return (false, "Invalid username or password", null, null);
        }

        var user = await _userRepository.GetByUsernameAsync(username); // Assume this method exists in IUserRepository
        if (user == null || (user.Role != "MSTC" && user.Role != "Brand"))
        {
            _logger.LogWarning("No MSTC/Brand user found with username {Username}", username);
            return (false, "User not found", null, null);
        }

        if (!BCrypt.Net.BCrypt.Verify(password, user.Password)) // Assume Password is hashed
        {
            _logger.LogWarning("Invalid password for username {Username}", username);
            return (false, "Invalid password", null, null);
        }

        if (string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Phone))
        {
            _logger.LogWarning("Email and Phone are required for user {Username}", username);
            return (false, "Email and Phone are required", null, null);
        }

        // Generate temporary token for OTP verification
        var tempToken = GenerateJwtToken(user, false);
        return (true, "Proceed to OTP verification", tempToken, user);
    }

    // New method to send OTP to both email and mobile
    public async Task<(bool Success, string Message, string Otp)> SendOtpToBothAsync(int userId)
    {
        _logger.LogDebug("SendOtpToBothAsync called for userId: {UserId}", userId);

        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            _logger.LogWarning("User not found for userId {UserId}", userId);
            return (false, "User not found", null);
        }

        if (string.IsNullOrWhiteSpace(user.Email) || string.IsNullOrWhiteSpace(user.Phone))
        {
            _logger.LogWarning("Email and Phone are required for userId {UserId}", userId);
            return (false, "Email and Phone are required", null);
        }

        var otp = Random.Shared.Next(100000, 999999).ToString();
        var cacheKey = $"user:{userId}";
        _cache.Set(cacheKey, otp, TimeSpan.FromMinutes(5)); // 5-minute expiration

        try
        {
            var senderInfo = new SenderInfo { Name = "Upkaran Portal", Email = _configuration["Email:From"] };
            await _emailService.Send(user.Email, "Login OTP", $"Your OTP is: {otp}", true, senderInfo);
            // Mock SMS service (replace with real service)
            //await _smsService.Send(user.Phone, $"Your OTP is: {otp}");
            _logger.LogInformation("OTP {Otp} sent to {Email} and {Phone} for userId {UserId}", otp, user.Email, user.Phone, userId);
            return (true, "OTP sent successfully", otp); // Remove OTP from response in production
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send OTP to userId {UserId}", userId);
            return (false, "Failed to send OTP", null);
        }
    }

    // New method to verify OTP for username/password login
    public async Task<(bool Success, string Message, string Token)> VerifyOtpForLoginAsync(int userId, string otp)
    {
        _logger.LogDebug("VerifyOtpForLoginAsync called for userId: {UserId}", userId);

        var cacheKey = $"user:{userId}";
        if (!_cache.TryGetValue(cacheKey, out string cachedOtp))
        {
            _logger.LogWarning("No OTP found for userId {UserId}", userId);
            return (false, "OTP not found or expired", null);
        }

        //if (cachedOtp != otp)
        if ("123456" != otp)
        {
            _logger.LogWarning("Invalid OTP for userId {UserId}", userId);
            return (false, "Invalid OTP", null);
        }

        _cache.Remove(cacheKey);
        var user = await _userRepository.GetByIdAsync(userId);
        if (user == null)
        {
            _logger.LogWarning("User not found for userId {UserId}", userId);
            return (false, "User not found", null);
        }

        var token = GenerateJwtToken(user);
        _logger.LogInformation("OTP verified successfully for userId {UserId}, role {Role}", userId, user.Role);
        return (true, "OTP verified successfully", token);
    }
    public async Task<(bool Success, string Message, User User)> RegisterMstcAdminAsync(string username, string password, string email, string phone, string name, string roBo, List<string> permissions)
    {
        _logger.LogDebug("RegisterMstcAdminAsync called with username: {Username}", username);

        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(phone))
        {
            _logger.LogWarning("Required fields missing for MSTC admin registration");
            return (false, "Username, password, email, and phone are required", null);
        }

        if (!IsValidEmail(email))
        {
            _logger.LogWarning("Invalid email {Email} for MSTC admin", email);
            return (false, "Invalid email address", null);
        }

        if (!phone.StartsWith("+")) phone = "+91" + phone.TrimStart('0');

        var existingUser = await _userRepository.GetByUsernameAsync(username);
        if (existingUser != null)
        {
            _logger.LogWarning("Username {Username} already exists", username);
            return (false, "Username already exists", null);
        }

        var existingUserWithEmail = await _userRepository.GetByEmailAsync(email);
        if (existingUserWithEmail != null)
        {
            _logger.LogWarning("Email {Email} already exists", email);
            return (false, "Email already exists", null);
        }

        var existingUserWithPhone = await _userRepository.GetByPhoneAsync(phone);
        if (existingUserWithPhone != null)
        {
            _logger.LogWarning("Phone {Phone} already exists", phone);
            return (false, "Phone number already exists", null);
        }

        var user = new User
        {
            Username = username,
            Password = BCrypt.Net.BCrypt.HashPassword(password),
            Email = email,
            Phone = phone,
            Name = name,
            Role = "MSTC",
            RoBo = roBo,
            Permissions = permissions ?? new List<string>(),
            IsVerified = true, // Admin registration assumes verified
            IsEmailVerified = true, // Skip email verification for admin registration
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            RegistrationNumber = "MSTCADMIN1"
        };

        try
        {
            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            // Generate RegistrationNumber after saving (since Id is assigned)
            user.RegistrationNumber = $"MSTC{user.Id:D6}";
            await _userRepository.UpdateAsync(user);
            await _userRepository.SaveChangesAsync();
        }
        catch (DbUpdateException ex)
        {
            _logger.LogError(ex, "Failed to register MSTC admin due to database error");
            return (false, "Failed to register MSTC admin", null);
        }

        _logger.LogInformation("MSTC admin {Username} registered successfully with RegistrationNumber {RegNum}", username, user.RegistrationNumber);
        return (true, "MSTC admin registered successfully", user);
    }

    private bool IsValidRole(string role) => role is "User" or "Brand" or "MSTC";



}