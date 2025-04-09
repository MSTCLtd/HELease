using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using Leasing.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Leasing.Infrastructure.Repositories
{
    public class EquipmentTypeRepository : IEquipmentTypeRepository
    {
        private readonly AppDbContext _context;

        public EquipmentTypeRepository(AppDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<List<EquipmentType>> GetAllAsync()
        {
            return await _context.EquipmentTypes
                .Include(et => et.Categories)
                .ToListAsync();
        }

        public async Task<EquipmentType> GetByIdAsync(int id)
        {
            return await _context.EquipmentTypes
                .Include(et => et.Categories)
                .FirstOrDefaultAsync(et => et.Id == id);
        }

        public async Task<EquipmentType> GetByCodeAsync(string code)
        {
            return await _context.EquipmentTypes
                .Include(et => et.Categories)
                .FirstOrDefaultAsync(et => et.Code == code);
        }

        public async Task AddAsync(EquipmentType equipmentType)
        {
            await _context.EquipmentTypes.AddAsync(equipmentType);
            await _context.SaveChangesAsync(); // Save immediately to ensure consistency
        }

        public async Task UpdateAsync(EquipmentType equipmentType)
        {
            _context.EquipmentTypes.Update(equipmentType);
            await _context.SaveChangesAsync(); // Save immediately to ensure consistency
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}