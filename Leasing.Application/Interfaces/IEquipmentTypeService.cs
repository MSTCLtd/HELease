using Leasing.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Leasing.Application.Interfaces
{
    public interface IEquipmentTypeService
    {
        Task<List<EquipmentType>> GetAllEquipmentTypesAsync();
        Task<EquipmentType> GetEquipmentTypeByIdAsync(int id);
        Task<(bool Success, string Message, EquipmentType EquipmentType)> AddEquipmentTypeAsync(
            string name, string code, bool isActive);
        Task<(bool Success, string Message, EquipmentType EquipmentType)> UpdateEquipmentTypeAsync(
            int id, string name, string code, bool isActive);
        Task<(bool Success, string Message, EquipmentCategory Category)> AddCategoryAsync(
            int equipmentTypeId, string level1, string level2, string level3, string level4, string level5);
        Task<(bool Success, string Message, EquipmentCategory Category)> UpdateCategoryAsync(
            int categoryId, string level1, string level2, string level3, string level4, string level5);
        Task<(bool Success, string Message)> DeleteCategoryAsync(int categoryId);
        Task<(bool Success, string Message, byte[] FileContent)> ExportCategoriesToExcelAsync(int equipmentTypeId);
        Task<(bool Success, string Message, List<EquipmentCategory> Categories)> ImportCategoriesFromExcelAsync(
            int equipmentTypeId, byte[] fileContent);
    }
}