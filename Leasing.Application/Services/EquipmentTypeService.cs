using Leasing.Application.Interfaces;
using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OfficeOpenXml;
using System.IO;

namespace Leasing.Application.Services
{
    public class EquipmentTypeService : IEquipmentTypeService
    {
        private readonly IEquipmentTypeRepository _equipmentTypeRepository;
        private readonly IEquipmentCategoryRepository _equipmentCategoryRepository;
        private readonly ILogger<EquipmentTypeService> _logger;

        public EquipmentTypeService(
            IEquipmentTypeRepository equipmentTypeRepository,
            IEquipmentCategoryRepository equipmentCategoryRepository,
            ILogger<EquipmentTypeService> logger)
        {
            _equipmentTypeRepository = equipmentTypeRepository ?? throw new ArgumentNullException(nameof(equipmentTypeRepository));
            _equipmentCategoryRepository = equipmentCategoryRepository ?? throw new ArgumentNullException(nameof(equipmentCategoryRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial; // Required for EPPlus
        }

        public async Task<List<EquipmentType>> GetAllEquipmentTypesAsync()
        {
            _logger.LogDebug("Fetching all equipment types");
            return await _equipmentTypeRepository.GetAllAsync();
        }

        public async Task<EquipmentType> GetEquipmentTypeByIdAsync(int id)
        {
            _logger.LogDebug("Fetching equipment type with ID {EquipmentTypeId}", id);
            return await _equipmentTypeRepository.GetByIdAsync(id);
        }

        public async Task<(bool Success, string Message, EquipmentType EquipmentType)> AddEquipmentTypeAsync(
            string name, string code, bool isActive)
        {
            _logger.LogDebug("AddEquipmentTypeAsync called with name: {Name}, code: {Code}", name, code);

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(code))
            {
                _logger.LogWarning("Required fields missing for equipment type");
                return (false, "Name and code are required", null);
            }

            // Check for duplicate code
            var existingType = await _equipmentTypeRepository.GetByCodeAsync(code);
            if (existingType != null)
            {
                _logger.LogWarning("Equipment type with code {Code} already exists", code);
                return (false, "Equipment type code already exists", null);
            }

            var equipmentType = new EquipmentType
            {
                SystemId = GenerateSystemId(), // Implement this method to generate a unique system ID
                Name = name,
                Code = code,
                IsActive = isActive,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            try
            {
                await _equipmentTypeRepository.AddAsync(equipmentType);
                await _equipmentTypeRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to add equipment type {Name} due to error", name);
                return (false, "Failed to add equipment type", null);
            }

            _logger.LogInformation("Equipment type {Name} added successfully", name);
            return (true, "Equipment type added successfully", equipmentType);
        }

        public async Task<(bool Success, string Message, EquipmentType EquipmentType)> UpdateEquipmentTypeAsync(
            int id, string name, string code, bool isActive)
        {
            _logger.LogDebug("UpdateEquipmentTypeAsync called for ID {EquipmentTypeId}", id);

            var equipmentType = await _equipmentTypeRepository.GetByIdAsync(id);
            if (equipmentType == null)
            {
                _logger.LogWarning("Equipment type not found for ID {EquipmentTypeId}", id);
                return (false, "Equipment type not found", null);
            }

            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(code))
            {
                _logger.LogWarning("Required fields missing for equipment type {EquipmentTypeId}", id);
                return (false, "Name and code are required", null);
            }

            // Check for duplicate code (excluding the current equipment type)
            var existingType = await _equipmentTypeRepository.GetByCodeAsync(code);
            if (existingType != null && existingType.Id != id)
            {
                _logger.LogWarning("Equipment type with code {Code} already exists", code);
                return (false, "Equipment type code already exists", null);
            }

            equipmentType.Name = name;
            equipmentType.Code = code;
            equipmentType.IsActive = isActive;
            equipmentType.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _equipmentTypeRepository.UpdateAsync(equipmentType);
                await _equipmentTypeRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update equipment type {EquipmentTypeId} due to error", id);
                return (false, "Failed to update equipment type", null);
            }

            _logger.LogInformation("Equipment type {EquipmentTypeId} updated successfully", id);
            return (true, "Equipment type updated successfully", equipmentType);
        }

        public async Task<(bool Success, string Message, EquipmentCategory Category)> AddCategoryAsync(
            int equipmentTypeId, string level1, string level2, string level3, string level4, string level5)
        {
            _logger.LogDebug("AddCategoryAsync called for equipment type ID {EquipmentTypeId}", equipmentTypeId);

            var equipmentType = await _equipmentTypeRepository.GetByIdAsync(equipmentTypeId);
            if (equipmentType == null)
            {
                _logger.LogWarning("Equipment type not found for ID {EquipmentTypeId}", equipmentTypeId);
                return (false, "Equipment type not found", null);
            }

            var category = new EquipmentCategory
            {
                EquipmentTypeId = equipmentTypeId,
                Level1 = level1,
                Level2 = level2,
                Level3 = level3,
                Level4 = level4,
                Level5 = level5,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            try
            {
                await _equipmentCategoryRepository.AddAsync(category);
                await _equipmentCategoryRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to add category for equipment type {EquipmentTypeId} due to error", equipmentTypeId);
                return (false, "Failed to add category", null);
            }

            _logger.LogInformation("Category added successfully for equipment type {EquipmentTypeId}", equipmentTypeId);
            return (true, "Category added successfully", category);
        }

        public async Task<(bool Success, string Message, EquipmentCategory Category)> UpdateCategoryAsync(
            int categoryId, string level1, string level2, string level3, string level4, string level5)
        {
            _logger.LogDebug("UpdateCategoryAsync called for category ID {CategoryId}", categoryId);

            var category = await _equipmentCategoryRepository.GetByIdAsync(categoryId);
            if (category == null)
            {
                _logger.LogWarning("Category not found for ID {CategoryId}", categoryId);
                return (false, "Category not found", null);
            }

            category.Level1 = level1;
            category.Level2 = level2;
            category.Level3 = level3;
            category.Level4 = level4;
            category.Level5 = level5;
            category.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _equipmentCategoryRepository.UpdateAsync(category);
                await _equipmentCategoryRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to update category {CategoryId} due to error", categoryId);
                return (false, "Failed to update category", null);
            }

            _logger.LogInformation("Category {CategoryId} updated successfully", categoryId);
            return (true, "Category updated successfully", category);
        }

        public async Task<(bool Success, string Message)> DeleteCategoryAsync(int categoryId)
        {
            _logger.LogDebug("DeleteCategoryAsync called for category ID {CategoryId}", categoryId);

            var category = await _equipmentCategoryRepository.GetByIdAsync(categoryId);
            if (category == null)
            {
                _logger.LogWarning("Category not found for ID {CategoryId}", categoryId);
                return (false, "Category not found");
            }

            try
            {
                await _equipmentCategoryRepository.DeleteAsync(categoryId);
                await _equipmentCategoryRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to delete category {CategoryId} due to error", categoryId);
                return (false, "Failed to delete category");
            }

            _logger.LogInformation("Category {CategoryId} deleted successfully", categoryId);
            return (true, "Category deleted successfully");
        }

        public async Task<(bool Success, string Message, byte[] FileContent)> ExportCategoriesToExcelAsync(int equipmentTypeId)
        {
            _logger.LogDebug("ExportCategoriesToExcelAsync called for equipment type ID {EquipmentTypeId}", equipmentTypeId);

            var equipmentType = await _equipmentTypeRepository.GetByIdAsync(equipmentTypeId);
            if (equipmentType == null)
            {
                _logger.LogWarning("Equipment type not found for ID {EquipmentTypeId}", equipmentTypeId);
                return (false, "Equipment type not found", null);
            }

            try
            {
                using (var package = new ExcelPackage())
                {
                    var worksheet = package.Workbook.Worksheets.Add("Categories");
                    worksheet.Cells[1, 1].Value = "Level 1";
                    worksheet.Cells[1, 2].Value = "Level 2";
                    worksheet.Cells[1, 3].Value = "Level 3";
                    worksheet.Cells[1, 4].Value = "Level 4";
                    worksheet.Cells[1, 5].Value = "Level 5";

                    int row = 2;
                    foreach (var category in equipmentType.Categories)
                    {
                        worksheet.Cells[row, 1].Value = category.Level1;
                        worksheet.Cells[row, 2].Value = category.Level2;
                        worksheet.Cells[row, 3].Value = category.Level3;
                        worksheet.Cells[row, 4].Value = category.Level4;
                        worksheet.Cells[row, 5].Value = category.Level5;
                        row++;
                    }

                    var fileContent = package.GetAsByteArray();
                    _logger.LogInformation("Exported categories to Excel for equipment type {EquipmentTypeId}", equipmentTypeId);
                    return (true, "Exported successfully", fileContent);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to export categories to Excel for equipment type {EquipmentTypeId}", equipmentTypeId);
                return (false, "Failed to export categories", null);
            }
        }

        public async Task<(bool Success, string Message, List<EquipmentCategory> Categories)> ImportCategoriesFromExcelAsync(
            int equipmentTypeId, byte[] fileContent)
        {
            _logger.LogDebug("ImportCategoriesFromExcelAsync called for equipment type ID {EquipmentTypeId}", equipmentTypeId);

            var equipmentType = await _equipmentTypeRepository.GetByIdAsync(equipmentTypeId);
            if (equipmentType == null)
            {
                _logger.LogWarning("Equipment type not found for ID {EquipmentTypeId}", equipmentTypeId);
                return (false, "Equipment type not found", null);
            }

            try
            {
                using (var stream = new MemoryStream(fileContent))
                using (var package = new ExcelPackage(stream))
                {
                    var worksheet = package.Workbook.Worksheets[0];
                    var rowCount = worksheet.Dimension.Rows;
                    var categories = new List<EquipmentCategory>();

                    for (int row = 2; row <= rowCount; row++)
                    {
                        var category = new EquipmentCategory
                        {
                            EquipmentTypeId = equipmentTypeId,
                            Level1 = worksheet.Cells[row, 1].Text,
                            Level2 = worksheet.Cells[row, 2].Text,
                            Level3 = worksheet.Cells[row, 3].Text,
                            Level4 = worksheet.Cells[row, 4].Text,
                            Level5 = worksheet.Cells[row, 5].Text,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow
                        };
                        categories.Add(category);
                    }

                    foreach (var category in categories)
                    {
                        await _equipmentCategoryRepository.AddAsync(category);
                    }
                    await _equipmentCategoryRepository.SaveChangesAsync();

                    _logger.LogInformation("Imported {CategoryCount} categories for equipment type {EquipmentTypeId}", categories.Count, equipmentTypeId);
                    return (true, "Imported successfully", categories);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to import categories from Excel for equipment type {EquipmentTypeId}", equipmentTypeId);
                return (false, "Failed to import categories", null);
            }
        }

        private string GenerateSystemId()
        {
            // Simple implementation; can be improved with a more robust method
            return (new Random().Next(100, 999)).ToString("D3");
        }
    }
}