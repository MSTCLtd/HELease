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
        Task<string> LoginAsync(string username, string password);
        Task<UserDto> RegisterAsync(string username, string password);
    }
}
