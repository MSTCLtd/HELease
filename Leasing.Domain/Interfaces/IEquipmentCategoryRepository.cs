using Leasing.Domain.Entities;
using System.Threading.Tasks;

namespace Leasing.Domain.Interfaces
{
    public interface IEquipmentCategoryRepository
    {
        Task<EquipmentCategory> GetByIdAsync(int id);
        Task AddAsync(EquipmentCategory category);
        Task UpdateAsync(EquipmentCategory category);
        Task DeleteAsync(int categoryId);
        Task SaveChangesAsync();
    }
}