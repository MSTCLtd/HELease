using Leasing.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Leasing.Presentation.Controllers
{
    [ApiController]
    [Route("api/products")]
    //[Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService ?? throw new ArgumentNullException(nameof(productService));
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(new { Products = products });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound(new { Message = "Product not found" });
            }
            return Ok(new { Product = product });
        }

        [HttpGet("equipment-types")]
        public async Task<IActionResult> GetEquipmentTypes()
        {
            var equipmentTypes = await _productService.GetEquipmentTypesAsync();
            return Ok(new { EquipmentTypes = equipmentTypes });
        }

        [HttpGet("brands")]
        public async Task<IActionResult> GetBrands([FromQuery] int equipmentTypeId)
        {
            var brands = await _productService.GetBrandsAsync(equipmentTypeId);
            return Ok(new { Brands = brands });
        }

        [HttpGet("models")]
        public async Task<IActionResult> GetModels([FromQuery] int equipmentTypeId, [FromQuery] string brand)
        {
            var models = await _productService.GetModelsAsync(equipmentTypeId, brand);
            return Ok(new { Models = models });
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromForm] AddProductRequest request)
        {
            var (success, message, product) = await _productService.AddProductAsync(
                request.EquipmentTypeId,
                request.EquipmentCategoryId,
                request.Brand,
                request.Model,
                request.YouTubeLink,
                request.Description,
                request.Specifications,
                request.Images
            );

            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return Ok(new { Message = message, Product = product });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromForm] UpdateProductRequest request)
        {
            var imagesToDelete = request.ImagesToDelete?.Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(int.Parse)
                .ToList() ?? new List<int>();

            var (success, message, product) = await _productService.UpdateProductAsync(
                id,
                request.EquipmentTypeId,
                request.EquipmentCategoryId,
                request.Brand,
                request.Model,
                request.YouTubeLink,
                request.Description,
                request.Specifications,
                request.Images,
                imagesToDelete
            );

            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return Ok(new { Message = message, Product = product });
        }

        [HttpDelete("brand")]
        public async Task<IActionResult> DeleteBrand([FromQuery] int equipmentTypeId, [FromQuery] string brand)
        {
            var (success, message) = await _productService.DeleteBrandAsync(equipmentTypeId, brand);
            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return Ok(new { Message = message });
        }

        [HttpDelete("model")]
        public async Task<IActionResult> DeleteModel([FromQuery] int equipmentTypeId, [FromQuery] string brand, [FromQuery] string model)
        {
            var (success, message) = await _productService.DeleteModelAsync(equipmentTypeId, brand, model);
            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return Ok(new { Message = message });
        }
    }

    public class AddProductRequest
    {
        public int EquipmentTypeId { get; set; }
        public int? EquipmentCategoryId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string YouTubeLink { get; set; }
        public string Description { get; set; }
        public string Specifications { get; set; }
        public List<IFormFile> Images { get; set; }
    }

    public class UpdateProductRequest
    {
        public int EquipmentTypeId { get; set; }
        public int? EquipmentCategoryId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string YouTubeLink { get; set; }
        public string Description { get; set; }
        public string Specifications { get; set; }
        public List<IFormFile> Images { get; set; }
        public string ImagesToDelete { get; set; } // Comma-separated list of image IDs to delete
    }
}