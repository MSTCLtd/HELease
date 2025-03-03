using Leasing.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Leasing.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EquipmentController : ControllerBase
    {
        private readonly IEquipmentRepository _equipmentRepository;
        public EquipmentController(IEquipmentRepository equipmentRepository)
        {
            _equipmentRepository = equipmentRepository;
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string category, string brand, string location)
        {
            var results = await _equipmentRepository.SearchAsync(category, brand, location);
            return Ok(results);
        }
    }
}
