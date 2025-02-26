using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using Leasing.Application.Dtos;
using Leasing.Application.Interfaces;
using Leasing.Domain;
using BCrypt.Net;
using Microsoft.Extensions.Logging;

namespace Leasing.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<AuthService> _logger;

        public AuthService(IUserRepository userRepository, ILogger<AuthService> logger)
        {
            _userRepository = userRepository;
            _logger = logger;
        }

        public async Task<string> LoginAsync(string username, string password)
        {
            _logger.LogDebug("Checking credentials for {Username}", username);
            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                _logger.LogWarning("Invalid login attempt for {Username}", username);
                throw new Exception("Invalid credentials");
            }
            _logger.LogInformation("Credentials verified for {Username}", username);
            return "jwt-token-placeholder";
        }

        public async Task<UserDto> RegisterAsync(string username, string password)
        {
            var user = new User { Username = username, PasswordHash = BCrypt.Net.BCrypt.HashPassword(password) };
            await _userRepository.AddAsync(user);
            return new UserDto { Id = user.Id, Username = user.Username };
        }
    }
}
