using Leasing.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetByUsernameAsync(string username);
        Task<User> GetByEmailAsync(string email);
        Task<User> GetByMobileNumberAsync(string mobileNumber);
        Task AddAsync(User user);
        Task UpdateAsync(User user);

        Task<User> GetByPhoneAsync(string phone);
      
        Task SaveChangesAsync();
        Task<User> GetByIdAsync(int id); // New method

        Task<List<User>> GetAllAsync();
        Task<List<User>> GetUsersByRoBoAsync(string roBo);
        Task<List<User>> GetAllMstcUsersAsync();
        Task DeleteAsync(int id); // New method to delete a user
    }
}
