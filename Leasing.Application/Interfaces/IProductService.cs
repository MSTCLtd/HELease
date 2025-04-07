using Leasing.Application.DTOs;
using Leasing.Domain.Entities;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Leasing.Application.Interfaces
{
    public interface IProductService
    {
        //Task<List<Product>> GetAllProductsAsync();
        //Task<Product> GetProductByIdAsync(int id);
        //Task<List<string>> GetEquipmentTypesAsync();
        //Task<List<string>> GetBrandsAsync(int equipmentTypeId);
        //Task<List<string>> GetModelsAsync(int equipmentTypeId, string brand);
        //Task<(bool Success, string Message, Product Product)> AddProductAsync(
        //    int equipmentTypeId, int? equipmentCategoryId, string brand, string model,
        //    string youTubeLink, string description, string specifications, List<IFormFile> images);
        //Task<(bool Success, string Message, Product Product)> UpdateProductAsync(
        //    int id, int equipmentTypeId, int? equipmentCategoryId, string brand, string model,
        //    string youTubeLink, string description, string specifications, List<IFormFile> images, List<int> imagesToDelete);
        //Task<(bool Success, string Message)> DeleteBrandAsync(int equipmentTypeId, string brand);
        //Task<(bool Success, string Message)> DeleteModelAsync(int equipmentTypeId, string brand, string model);

        Task<List<ProductDto>> GetAllProductsAsync();
        Task<ProductDto> GetProductByIdAsync(int id);
        Task<List<string>> GetEquipmentTypesAsync();
        Task<List<string>> GetBrandsAsync(int equipmentTypeId);
        Task<List<string>> GetModelsAsync(int equipmentTypeId, string brand);
        Task<(bool Success, string Message, ProductDto Product)> AddProductAsync(int equipmentTypeId, int? equipmentCategoryId, string brand, string model, string youTubeLink, string description, string specifications, List<IFormFile> images);
        Task<(bool Success, string Message, ProductDto Product)> UpdateProductAsync(int id, int equipmentTypeId, int? equipmentCategoryId, string brand, string model, string youTubeLink, string description, string specifications, List<IFormFile> images, List<int> imagesToDelete);
        Task<(bool Success, string Message)> DeleteBrandAsync(int equipmentTypeId, string brand);
        Task<(bool Success, string Message)> DeleteModelAsync(int equipmentTypeId, string brand, string model);
    }
}