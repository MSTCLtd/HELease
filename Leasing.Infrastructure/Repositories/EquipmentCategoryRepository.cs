using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using Leasing.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Leasing.Infrastructure.Repositories
{
    public class EquipmentCategoryRepository : IEquipmentCategoryRepository
    {
        private readonly AppDbContext _context;

        public EquipmentCategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<EquipmentCategory> GetByIdAsync(int id)
        {
            return await _context.EquipmentCategories.FindAsync(id);
        }

        public async Task AddAsync(EquipmentCategory category)
        {
            await _context.EquipmentCategories.AddAsync(category);
        }

        public async Task UpdateAsync(EquipmentCategory category)
        {
            _context.EquipmentCategories.Update(category);
        }

        public async Task DeleteAsync(int categoryId)
        {
            var category = await _context.EquipmentCategories.FindAsync(categoryId);
            if (category != null)
            {
                _context.EquipmentCategories.Remove(category);
            }
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}