using Leasing.Application.Interfaces;
using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Leasing.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IEquipmentTypeRepository _equipmentTypeRepository;
        private readonly IImageRepository _imageRepository;
        private readonly string _imageStoragePath;

        public ProductService(
            IProductRepository productRepository,
            IEquipmentTypeRepository equipmentTypeRepository,
            IImageRepository imageRepository,
            IConfiguration configuration)
        {
            _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
            _equipmentTypeRepository = equipmentTypeRepository ?? throw new ArgumentNullException(nameof(equipmentTypeRepository));
            _imageRepository = imageRepository ?? throw new ArgumentNullException(nameof(imageRepository));
            _imageStoragePath = configuration.GetSection("ImageStorage:Path").Value;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _productRepository.GetAllProductsAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _productRepository.GetProductByIdAsync(id);
        }

        public async Task<List<string>> GetEquipmentTypesAsync()
        {
            var equipmentTypes = await _equipmentTypeRepository.GetAllAsync();
            return equipmentTypes.Select(et => et.Name).ToList();
        }

        public async Task<List<string>> GetBrandsAsync(int equipmentTypeId)
        {
            var products = await _productRepository.GetProductsByTypeAsync(equipmentTypeId);
            return products.Select(p => p.Brand).Distinct().ToList();
        }

        public async Task<List<string>> GetModelsAsync(int equipmentTypeId, string brand)
        {
            var products = await _productRepository.GetProductsByTypeAndBrandAsync(equipmentTypeId, brand);
            return products.Select(p => p.Model).Distinct().ToList();
        }

        public async Task<(bool Success, string Message, Product Product)> AddProductAsync(
            int equipmentTypeId, int? equipmentCategoryId, string brand, string model,
            string youTubeLink, string description, string specifications, List<IFormFile> images)
        {
            try
            {
                var equipmentType = await _equipmentTypeRepository.GetByIdAsync(equipmentTypeId);
                if (equipmentType == null)
                {
                    return (false, "Equipment type not found", null);
                }

                if (equipmentCategoryId.HasValue)
                {
                    var category = equipmentType.Categories.FirstOrDefault(c => c.Id == equipmentCategoryId);
                    if (category == null)
                    {
                        return (false, "Equipment category not found", null);
                    }
                }

                if (string.IsNullOrWhiteSpace(brand) || string.IsNullOrWhiteSpace(model))
                {
                    return (false, "Brand and model are required", null);
                }

                var existingProduct = await _productRepository.GetProductByTypeBrandAndModelAsync(equipmentTypeId, brand, model);
                if (existingProduct != null)
                {
                    return (false, "Product with this type, brand, and model already exists", null);
                }

                var product = new Product
                {
                    EquipmentTypeId = equipmentTypeId,
                    EquipmentCategoryId = equipmentCategoryId,
                    Brand = brand,
                    Model = model,
                    YouTubeLink = youTubeLink,
                    Description = description,
                    Specifications = specifications,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                await _productRepository.AddProductAsync(product);

                if (images != null && images.Any())
                {
                    // Ensure the storage directory exists
                    if (!Directory.Exists(_imageStoragePath))
                    {
                        Directory.CreateDirectory(_imageStoragePath);
                    }

                    foreach (var image in images)
                    {
                        // Generate a unique file name
                        var fileName = $"{Guid.NewGuid()}_{image.FileName}";
                        var filePath = Path.Combine(_imageStoragePath, fileName);

                        // Save the file to the specified directory (D://images)
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        // Save the relative path for the frontend to access
                        // Since D://images is outside wwwroot, we'll map it to a virtual path
                        var relativePath = $"/images/{fileName}";
                        var imageEntity = new Image
                        {
                            ProductId = product.Id,
                            FilePath = relativePath,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow
                        };
                        await _imageRepository.AddImageAsync(imageEntity);
                        product.Images.Add(imageEntity);
                    }
                }

                return (true, "Product added successfully", product);
            }
            catch (Exception ex)
            {
                return (false, $"Error adding product: {ex.Message}", null);
            }
        }

        public async Task<(bool Success, string Message, Product Product)> UpdateProductAsync(
            int id, int equipmentTypeId, int? equipmentCategoryId, string brand, string model,
            string youTubeLink, string description, string specifications, List<IFormFile> images, List<int> imagesToDelete)
        {
            try
            {
                var product = await _productRepository.GetProductByIdAsync(id);
                if (product == null)
                {
                    return (false, "Product not found", null);
                }

                var equipmentType = await _equipmentTypeRepository.GetByIdAsync(equipmentTypeId);
                if (equipmentType == null)
                {
                    return (false, "Equipment type not found", null);
                }

                if (equipmentCategoryId.HasValue)
                {
                    var category = equipmentType.Categories.FirstOrDefault(c => c.Id == equipmentCategoryId);
                    if (category == null)
                    {
                        return (false, "Equipment category not found", null);
                    }
                }

                if (string.IsNullOrWhiteSpace(brand) || string.IsNullOrWhiteSpace(model))
                {
                    return (false, "Brand and model are required", null);
                }

                var existingProduct = await _productRepository.GetProductByTypeBrandAndModelAsync(equipmentTypeId, brand, model);
                if (existingProduct != null && existingProduct.Id != id)
                {
                    return (false, "Product with this type, brand, and model already exists", null);
                }

                product.EquipmentTypeId = equipmentTypeId;
                product.EquipmentCategoryId = equipmentCategoryId;
                product.Brand = brand;
                product.Model = model;
                product.YouTubeLink = youTubeLink;
                product.Description = description;
                product.Specifications = specifications;
                product.UpdatedAt = DateTime.UtcNow;

                // Delete specified images
                if (imagesToDelete != null && imagesToDelete.Any())
                {
                    foreach (var imageId in imagesToDelete)
                    {
                        var image = await _imageRepository.GetImageByIdAsync(imageId);
                        if (image != null)
                        {
                            // Delete the file from the D://images directory
                            var fileName = Path.GetFileName(image.FilePath);
                            var fullPath = Path.Combine(_imageStoragePath, fileName);
                            if (File.Exists(fullPath))
                            {
                                File.Delete(fullPath);
                            }

                            // Delete the image record from the database
                            await _imageRepository.DeleteImageAsync(imageId);
                            product.Images.RemoveAll(i => i.Id == imageId);
                        }
                    }
                }

                // Add new images
                if (images != null && images.Any())
                {
                    // Ensure the storage directory exists
                    if (!Directory.Exists(_imageStoragePath))
                    {
                        Directory.CreateDirectory(_imageStoragePath);
                    }

                    foreach (var image in images)
                    {
                        // Generate a unique file name
                        var fileName = $"{Guid.NewGuid()}_{image.FileName}";
                        var filePath = Path.Combine(_imageStoragePath, fileName);

                        // Save the file to the specified directory (D://images)
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await image.CopyToAsync(stream);
                        }

                        // Save the relative path for the frontend to access
                        var relativePath = $"/images/{fileName}";
                        var imageEntity = new Image
                        {
                            ProductId = product.Id,
                            FilePath = relativePath,
                            CreatedAt = DateTime.UtcNow,
                            UpdatedAt = DateTime.UtcNow
                        };
                        await _imageRepository.AddImageAsync(imageEntity);
                        product.Images.Add(imageEntity);
                    }
                }

                await _productRepository.UpdateProductAsync(product);
                return (true, "Product updated successfully", product);
            }
            catch (Exception ex)
            {
                return (false, $"Error updating product: {ex.Message}", null);
            }
        }

        public async Task<(bool Success, string Message)> DeleteBrandAsync(int equipmentTypeId, string brand)
        {
            try
            {
                var products = await _productRepository.GetProductsByTypeAndBrandAsync(equipmentTypeId, brand);
                if (!products.Any())
                {
                    return (false, "No products found for this brand and type");
                }

                foreach (var product in products)
                {
                    foreach (var image in product.Images)
                    {
                        // Delete the file from the D://images directory
                        var fileName = Path.GetFileName(image.FilePath);
                        var fullPath = Path.Combine(_imageStoragePath, fileName);
                        if (File.Exists(fullPath))
                        {
                            File.Delete(fullPath);
                        }

                        await _imageRepository.DeleteImageAsync(image.Id);
                    }
                    await _productRepository.DeleteProductAsync(product.Id);
                }

                return (true, "Brand and all its models deleted successfully");
            }
            catch (Exception ex)
            {
                return (false, $"Error deleting brand: {ex.Message}");
            }
        }

        public async Task<(bool Success, string Message)> DeleteModelAsync(int equipmentTypeId, string brand, string model)
        {
            try
            {
                var product = await _productRepository.GetProductByTypeBrandAndModelAsync(equipmentTypeId, brand, model);
                if (product == null)
                {
                    return (false, "Product not found");
                }

                foreach (var image in product.Images)
                {
                    // Delete the file from the D://images directory
                    var fileName = Path.GetFileName(image.FilePath);
                    var fullPath = Path.Combine(_imageStoragePath, fileName);
                    if (File.Exists(fullPath))
                    {
                        File.Delete(fullPath);
                    }

                    await _imageRepository.DeleteImageAsync(image.Id);
                }

                await _productRepository.DeleteProductAsync(product.Id);
                return (true, "Model deleted successfully");
            }
            catch (Exception ex)
            {
                return (false, $"Error deleting model: {ex.Message}");
            }
        }
    }
}