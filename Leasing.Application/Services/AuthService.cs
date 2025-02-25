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

namespace Leasing.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<string> LoginAsync(string username, string password)
        {
            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                throw new Exception("Invalid credentials");
            return "jwt-token-placeholder"; // Replaced in Presentation with real JWT
        }

        public async Task<UserDto> RegisterAsync(string username, string password)
        {
            var user = new User { Username = username, PasswordHash = BCrypt.Net.BCrypt.HashPassword(password) };
            await _userRepository.AddAsync(user);
            return new UserDto { Id = user.Id, Username = user.Username };
        }
    }
}
