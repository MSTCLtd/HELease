using Leasing.Domain.Interfaces;
using Leasing.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Leasing.Domain.Entities;

namespace Leasing.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Name == username);
        }

        //public async Task<User> AddAsync(User user)
        //{
        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();
        //    return user;
        //}

        //public async Task UpdateAsync(User user)
        //{
        //    _context.Users.Update(user);
        //    await _context.SaveChangesAsync();
        //}
        public async Task<User> GetByMobileNumberAsync(string mobileNumber)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Name== mobileNumber);
        }
        public async Task<User> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

       

        public async Task<User> GetByPhoneAsync(string phone)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Phone == phone);
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await Task.CompletedTask;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
