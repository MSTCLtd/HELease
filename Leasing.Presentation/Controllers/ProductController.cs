using Microsoft.AspNetCore.Mvc;
using Leasing.Application.DTOs;
using Leasing.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Leasing.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            return product != null ? Ok(product) : NotFound();
        }

        [HttpGet("types")]
        public async Task<IActionResult> GetEquipmentTypes()
        {
            var types = await _productService.GetEquipmentTypesAsync();
            return Ok(types);
        }

        [HttpGet("brands/{equipmentTypeId}")]
        public async Task<IActionResult> GetBrands(int equipmentTypeId)
        {
            var brands = await _productService.GetBrandsAsync(equipmentTypeId);
            return Ok(brands);
        }

        [HttpGet("models/{equipmentTypeId}/{brand}")]
        public async Task<IActionResult> GetModels(int equipmentTypeId, string brand)
        {
            var models = await _productService.GetModelsAsync(equipmentTypeId, brand);
            return Ok(models);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(
            int equipmentTypeId, int? equipmentCategoryId, string brand, string model,
            string youTubeLink, string description, string specifications, List<IFormFile> images)
        {
            var (success, message, product) = await _productService.AddProductAsync(equipmentTypeId, equipmentCategoryId, brand, model, youTubeLink, description, specifications, images);
            if (!success) return BadRequest(new { message });
            return CreatedAtAction(nameof(GetProductById), new { id = product.Id }, product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(
            int id, int equipmentTypeId, int? equipmentCategoryId, string brand, string model,
            string youTubeLink, string description, string specifications, List<IFormFile> images, List<int> imagesToDelete)
        {
            var (success, message, product) = await _productService.UpdateProductAsync(id, equipmentTypeId, equipmentCategoryId, brand, model, youTubeLink, description, specifications, images, imagesToDelete);
            if (!success) return BadRequest(new { message });
            return Ok(product);
        }

        [HttpDelete("brand/{equipmentTypeId}/{brand}")]
        public async Task<IActionResult> DeleteBrand(int equipmentTypeId, string brand)
        {
            var (success, message) = await _productService.DeleteBrandAsync(equipmentTypeId, brand);
            if (!success) return BadRequest(new { message });
            return NoContent();
        }

        [HttpDelete("model/{equipmentTypeId}/{brand}/{model}")]
        public async Task<IActionResult> DeleteModel(int equipmentTypeId, string brand, string model)
        {
            var (success, message) = await _productService.DeleteModelAsync(equipmentTypeId, brand, model);
            if (!success) return BadRequest(new { message });
            return NoContent();
        }
    }
}