using Leasing.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Leasing.Domain.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<List<Product>> GetProductsByTypeAsync(int equipmentTypeId);
        Task<List<Product>> GetProductsByTypeAndBrandAsync(int equipmentTypeId, string brand);
        Task<Product> GetProductByTypeBrandAndModelAsync(int equipmentTypeId, string brand, string model);
        Task AddProductAsync(Product product);
        Task UpdateProductAsync(Product product);
        Task DeleteProductAsync(int id);

        // Elasticsearch methods
        Task IndexProductAsync(Product product);
        Task UpdateIndexAsync(Product product);
        Task DeleteFromIndexAsync(int id);
    }
}