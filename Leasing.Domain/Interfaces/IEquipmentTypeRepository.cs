using Leasing.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Leasing.Domain.Interfaces
{
    public interface IEquipmentTypeRepository
    {
        Task<List<EquipmentType>> GetAllAsync();
        Task<EquipmentType> GetByIdAsync(int id);
        Task<EquipmentType> GetByCodeAsync(string code);
        Task AddAsync(EquipmentType equipmentType);
        Task UpdateAsync(EquipmentType equipmentType);
        Task SaveChangesAsync();
    }
}