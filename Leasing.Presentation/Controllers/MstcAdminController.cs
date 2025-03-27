using Leasing.Application.DTOs;
using Leasing.Application.Interfaces;
using Leasing.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Leasing.Presentation.Controllers
{
    [ApiController]
    [Route("api/mstc-admin")]
    //[Authorize(Roles = "MSTC")]
    public class MstcAdminController : ControllerBase
    {
        private readonly IMstcAdminService _mstcAdminService;
        private readonly IAuthService _authService;
        private readonly IEquipmentTypeService _equipmentTypeService;
        private readonly ILocationService _locationService;
        private readonly IBillingReportService _billingReportService;
        public MstcAdminController(
            IMstcAdminService mstcAdminService,
            IAuthService authService, IEquipmentTypeService equipmentTypeService, ILocationService locationService, IBillingReportService billingReportService)
        {
            _mstcAdminService = mstcAdminService ?? throw new ArgumentNullException(nameof(mstcAdminService));
            _authService = authService ?? throw new ArgumentNullException(nameof(authService));
            _equipmentTypeService = equipmentTypeService ?? throw new ArgumentNullException(nameof(equipmentTypeService));
            _locationService = locationService ?? throw new ArgumentNullException(nameof(locationService));
            _billingReportService = billingReportService ?? throw new ArgumentNullException(nameof(billingReportService));
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _mstcAdminService.GetAllUsersAsync();
            return Ok(new { Users = users });
        }

        [HttpGet("mstc-users")]
        public async Task<IActionResult> GetAllMstcUsers()
        {
            var users = await _mstcAdminService.GetAllMstcUsersAsync();
            return Ok(new { MstcUsers = users });
        }

        [HttpGet("mstc-users/{userId}")]
        public async Task<IActionResult> GetMstcUserById(int userId)
        {
            var user = await _mstcAdminService.GetMstcUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound(new { Message = "MSTC user not found" });
            }
            return Ok(new { User = user });
        }

        [HttpGet("robo-list")]
        public async Task<IActionResult> GetRoBoList()
        {
            var roBoList = await _mstcAdminService.GetRoBoListAsync();
            return Ok(new { RoBoList = roBoList });
        }

        [HttpGet("users-by-robo")]
        public async Task<IActionResult> GetUsersByRoBo([FromQuery] string roBo)
        {
            var users = await _mstcAdminService.GetUsersByRoBoAsync(roBo);
            return Ok(new { Users = users.Select(u => new { u.Id, u.Name }) });
        }

        [HttpGet("permissions-list")]
        public async Task<IActionResult> GetPermissionsList()
        {
            var permissions = await _mstcAdminService.GetPermissionsListAsync();
            return Ok(new { Permissions = permissions });
        }

        [HttpPost("register-mstc-user")]
        public async Task<IActionResult> RegisterMstcUser([FromBody] RegisterMstcUserRequest request)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Add / Edit MSTC Users"))
            //{
            //    return Forbid("You do not have permission to register MSTC users");
            //}

            var (success, message, user) = await _authService.RegisterMstcAdminAsync(
                request.Username,
                request.Password,
                request.Email,
                request.Phone,
                request.Name,
                request.RoBo,
                request.Permissions
            );

            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return Ok(new
            {
                Message = message,
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Phone,
                    user.Name,
                    user.Role,
                    user.RoBo,
                    user.Permissions,
                    user.RegistrationNumber
                }
            });
        }

        [HttpPut("update-user/{userId}")]
        public async Task<IActionResult> UpdateUser(int userId, [FromBody] UpdateUserRequest request)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Add / Edit MSTC Users"))
            //{
            //    return Forbid("You do not have permission to update users");
            //}

            var (success, message, user) = await _mstcAdminService.UpdateUserAsync(
                userId,
                request.Name,
                request.Email,
                request.Phone,
                request.Permissions,
                request.RoBo
            );

            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return Ok(new
            {
                Message = message,
                User = new
                {
                    user.Id,
                    user.Username,
                    user.Email,
                    user.Phone,
                    user.Name,
                    user.Role,
                    user.RoBo,
                    user.Permissions
                }
            });
        }

        [HttpDelete("delete-user/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Add / Edit MSTC Users"))
            //{
            //    return Forbid("You do not have permission to delete users");
            //}

            // Prevent self-deletion
            //if (requesterId == userId)
            //{
            //    return BadRequest(new { Message = "You cannot delete your own account" });
            //}

            var (success, message) = await _mstcAdminService.DeleteUserAsync(userId);
            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return Ok(new { Message = message });
        }

        //[HttpPost("register-supplier")]
        //public async Task<IActionResult> RegisterSupplier([FromBody] RegisterSupplierRequest request)
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Add / Edit MSTC Users"))
        //    {
        //        return Forbid("You do not have permission to register Suppliers");
        //    }

        //    var (success, message, user) = await _mstcAdminService.RegisterSupplierAsync(
        //        request.Username,
        //        request.Password,
        //        request.Email,
        //        request.Phone,
        //        request.Name,
        //        request.BusinessType
        //    );

        //    if (!success)
        //    {
        //        return BadRequest(new { Message = message });
        //    }

        //    return Ok(new
        //    {
        //        Message = message,
        //        User = new
        //        {
        //            user.Id,
        //            user.Username,
        //            user.Email,
        //            user.Phone,
        //            user.Name,
        //            user.Role,
        //            user.BusinessType,
        //            user.RegistrationNumber
        //        }
        //    });
        //}

        //[HttpGet("equipment")]
        //public async Task<IActionResult> GetAllEquipment()
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Equipment Master"))
        //    {
        //        return Forbid("You do not have permission to access Equipment Master");
        //    }

        //    var equipment = await _equipmentService.GetAllEquipmentAsync();
        //    return Ok(new { Equipment = equipment });
        //}

        //[HttpPost("equipment")]
        //[Consumes("multipart/form-data")]
        //public async Task<IActionResult> AddEquipment(
        //    [FromForm] AddEquipmentRequest request,
        //    [FromForm] List<IFormFile> images)
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Equipment Master"))
        //    {
        //        return Forbid("You do not have permission to manage Equipment Master");
        //    }

        //    var (success, message, equipment) = await _equipmentService.AddEquipmentAsync(
        //        request.Name,
        //        request.Description,
        //        request.Category,
        //        request.SerialNumber,
        //        request.LocationId,
        //        request.RentalRate,
        //        request.Status,
        //        requesterId,
        //        images
        //    );

        //    if (!success)
        //    {
        //        return BadRequest(new { Message = message });
        //    }

        //    return Ok(new { Message = message, Equipment = equipment });
        //}

        //[HttpPut("equipment/{equipmentId}")]
        //[Consumes("multipart/form-data")] // Update to accept multipart form data
        //public async Task<IActionResult> UpdateEquipment(
        //    int equipmentId,
        //    [FromForm] UpdateEquipmentRequest request,
        //    [FromForm] List<IFormFile> images) // Accept image files
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Equipment Master"))
        //    {
        //        return Forbid("You do not have permission to manage Equipment Master");
        //    }

        //    var (success, message, equipment) = await _equipmentService.UpdateEquipmentAsync(
        //        equipmentId,
        //        request.Name,
        //        request.Description,
        //        request.Category,
        //        request.SerialNumber,
        //        request.LocationId,
        //        request.RentalRate,
        //        request.Status,
        //        requesterId,
        //        images // Pass the uploaded image files
        //    );

        //    if (!success)
        //    {
        //        return BadRequest(new { Message = message });
        //    }

        //    return Ok(new { Message = message, Equipment = equipment });
        //}

        //[HttpGet("locations")]
        //public async Task<IActionResult> GetAllLocations()
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Location Master"))
        //    {
        //        return Forbid("You do not have permission to access Location Master");
        //    }

        //    var locations = await _mstcAdminService.GetAllLocationsAsync();
        //    return Ok(new { Locations = locations });
        //}

        //[HttpPost("locations")]
        //public async Task<IActionResult> AddLocation([FromBody] AddLocationRequest request)
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Location Master"))
        //    {
        //        return Forbid("You do not have permission to manage Location Master");
        //    }

        //    var (success, message, location) = await _mstcAdminService.AddLocationAsync(
        //        request.Name,
        //        request.Address,
        //        request.City,
        //        request.State,
        //        request.Country,
        //        request.PinCode
        //    );

        //    if (!success)
        //    {
        //        return BadRequest(new { Message = message });
        //    }

        //    return Ok(new { Message = message, Location = location });
        //}

        //[HttpPut("locations/{locationId}")]
        //public async Task<IActionResult> UpdateLocation(int locationId, [FromBody] UpdateLocationRequest request)
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Location Master"))
        //    {
        //        return Forbid("You do not have permission to manage Location Master");
        //    }

        //    var (success, message, location) = await _mstcAdminService.UpdateLocationAsync(
        //        locationId,
        //        request.Name,
        //        request.Address,
        //        request.City,
        //        request.State,
        //        request.Country,
        //        request.PinCode
        //    );

        //    if (!success)
        //    {
        //        return BadRequest(new { Message = message });
        //    }

        //    return Ok(new { Message = message, Location = location });
        //}

        //[HttpGet("billing-report")]
        //public async Task<IActionResult> GetBillingReport()
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Billing Report"))
        //    {
        //        return Forbid("You do not have permission to access Billing Report");
        //    }

        //    var report = await _mstcAdminService.GetBillingReportAsync();
        //    return Ok(report);
        //}

        //[HttpGet("supplier-mis")]
        //public async Task<IActionResult> GetSupplierMis()
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Supplier MIS"))
        //    {
        //        return Forbid("You do not have permission to access Supplier MIS");
        //    }

        //    var mis = await _mstcAdminService.GetSupplierMisAsync();
        //    return Ok(mis);
        //}

        //[HttpGet("product-mis")]
        //public async Task<IActionResult> GetProductMis()
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Product MIS"))
        //    {
        //        return Forbid("You do not have permission to access Product MIS");
        //    }

        //    var mis = await _mstcAdminService.GetProductMisAsync();
        //    return Ok(mis);
        //}

        //[HttpGet("user-mis")]
        //public async Task<IActionResult> GetUserMis()
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("User MIS"))
        //    {
        //        return Forbid("You do not have permission to access User MIS");
        //    }

        //    var mis = await _mstcAdminService.GetUserMisAsync();
        //    return Ok(mis);
        //}

        //[HttpGet("notifications")]
        //public async Task<IActionResult> GetNotifications()
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Notifications"))
        //    {
        //        return Forbid("You do not have permission to access Notifications");
        //    }

        //    var notifications = await _mstcAdminService.GetNotificationsAsync();
        //    return Ok(notifications);
        //}

        //[HttpGet("service-charge-module")]
        //public async Task<IActionResult> GetServiceChargeModule()
        //{
        //    var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        //    var requester = await _mstcAdminService.GetUserByIdAsync(requesterId);
        //    if (!requester.Permissions.Contains("Service Charge Module"))
        //    {
        //        return Forbid("You do not have permission to access Service Charge Module");
        //    }

        //    var module = await _mstcAdminService.GetServiceChargeModuleAsync();
        //    return Ok(module);
        //}

        [HttpGet("equipment-types")]
        public async Task<IActionResult> GetAllEquipmentTypes()
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Equipment Master"))
            //{
            //    return Forbid("You do not have permission to access Equipment Master");
            //}

            var equipmentTypes = await _equipmentTypeService.GetAllEquipmentTypesAsync();
            var equipmentTypeDtos = equipmentTypes.Select(et => new EquipmentTypeDto
            {
                Id = et.Id,
                SystemId = et.SystemId,
                Name = et.Name,
                Code = et.Code,
                IsActive = et.IsActive,
                CreatedAt = et.CreatedAt,
                UpdatedAt = et.UpdatedAt,
                Categories = et.Categories.Select(c => new EquipmentCategoryDto
                {
                    Id = c.Id,
                    EquipmentTypeId = c.EquipmentTypeId,
                    Level1 = c.Level1,
                    Level2 = c.Level2,
                    Level3 = c.Level3,
                    Level4 = c.Level4,
                    Level5 = c.Level5,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt
                }).ToList()
            }).ToList();

            return Ok(new { EquipmentTypes = equipmentTypeDtos });
        }

        [HttpGet("equipment-types/{id}")]
        public async Task<IActionResult> GetEquipmentTypeById(int id)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Equipment Master"))
            //{
            //    return Forbid("You do not have permission to access Equipment Master");
            //}

            var equipmentType = await _equipmentTypeService.GetEquipmentTypeByIdAsync(id);
            if (equipmentType == null)
            {
                return NotFound(new { Message = "Equipment type not found" });
            }

            var equipmentTypeDto = new EquipmentTypeDto
            {
                Id = equipmentType.Id,
                SystemId = equipmentType.SystemId,
                Name = equipmentType.Name,
                Code = equipmentType.Code,
                IsActive = equipmentType.IsActive,
                CreatedAt = equipmentType.CreatedAt,
                UpdatedAt = equipmentType.UpdatedAt,
                Categories = equipmentType.Categories.Select(c => new EquipmentCategoryDto
                {
                    Id = c.Id,
                    EquipmentTypeId = c.EquipmentTypeId,
                    Level1 = c.Level1,
                    Level2 = c.Level2,
                    Level3 = c.Level3,
                    Level4 = c.Level4,
                    Level5 = c.Level5,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt
                }).ToList()
            };
            return Ok(new { EquipmentType = equipmentTypeDto });
        }

        [HttpPost("equipment-types")]
        public async Task<IActionResult> AddEquipmentType([FromBody] AddEquipmentTypeRequest request)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Equipment Master"))
            //{
            //    return Forbid("You do not have permission to manage Equipment Master");
            //}

            var (success, message, equipmentType) = await _equipmentTypeService.AddEquipmentTypeAsync(
                request.Name,
                request.Code,
                request.IsActive
            );

            if (!success)
            {
                return BadRequest(new { Message = message });
            }
            var equipmentTypeDto = new EquipmentTypeDto
            {
                Id = equipmentType.Id,
                SystemId = equipmentType.SystemId,
                Name = equipmentType.Name,
                Code = equipmentType.Code,
                IsActive = equipmentType.IsActive,
                CreatedAt = equipmentType.CreatedAt,
                UpdatedAt = equipmentType.UpdatedAt,
                Categories = equipmentType.Categories.Select(c => new EquipmentCategoryDto
                {
                    Id = c.Id,
                    EquipmentTypeId = c.EquipmentTypeId,
                    Level1 = c.Level1,
                    Level2 = c.Level2,
                    Level3 = c.Level3,
                    Level4 = c.Level4,
                    Level5 = c.Level5,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt
                }).ToList()
            };

            return Ok(new { Message = message, EquipmentType = equipmentTypeDto });
        }

        [HttpPut("equipment-types/{id}")]
        public async Task<IActionResult> UpdateEquipmentType(int id, [FromBody] UpdateEquipmentTypeRequest request)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Equipment Master"))
            //{
            //    return Forbid("You do not have permission to manage Equipment Master");
            //}

            var (success, message, equipmentType) = await _equipmentTypeService.UpdateEquipmentTypeAsync(
                id,
                request.Name,
                request.Code,
                request.IsActive
            );

            if (!success)
            {
                return BadRequest(new { Message = message });
            }
            var equipmentTypeDto = new EquipmentTypeDto
            {
                Id = equipmentType.Id,
                SystemId = equipmentType.SystemId,
                Name = equipmentType.Name,
                Code = equipmentType.Code,
                IsActive = equipmentType.IsActive,
                CreatedAt = equipmentType.CreatedAt,
                UpdatedAt = equipmentType.UpdatedAt,
                Categories = equipmentType.Categories.Select(c => new EquipmentCategoryDto
                {
                    Id = c.Id,
                    EquipmentTypeId = c.EquipmentTypeId,
                    Level1 = c.Level1,
                    Level2 = c.Level2,
                    Level3 = c.Level3,
                    Level4 = c.Level4,
                    Level5 = c.Level5,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt
                }).ToList()
            };

            return Ok(new { Message = message, EquipmentType = equipmentTypeDto });
        }

        [HttpPost("equipment-types/{equipmentTypeId}/categories")]
        public async Task<IActionResult> AddCategory(int equipmentTypeId, [FromBody] AddCategoryRequest request)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Equipment Master"))
            //{
            //    return Forbid("You do not have permission to manage Equipment Master");
            //}

            var (success, message, category) = await _equipmentTypeService.AddCategoryAsync(
                equipmentTypeId,
                request.Level1,
                request.Level2,
                request.Level3,
                request.Level4,
                request.Level5
            );

            if (!success)
            {
                return BadRequest(new { Message = message });
            }
            var categoryDto = new EquipmentCategoryDto
            {
                Id = category.Id,
                EquipmentTypeId = category.EquipmentTypeId,
                Level1 = category.Level1,
                Level2 = category.Level2,
                Level3 = category.Level3,
                Level4 = category.Level4,
                Level5 = category.Level5,
                CreatedAt = category.CreatedAt,
                UpdatedAt = category.UpdatedAt
            };

            return Ok(new { Message = message, Category = categoryDto });
        }

        [HttpPut("equipment-types/categories/{categoryId}")]
        public async Task<IActionResult> UpdateCategory(int categoryId, [FromBody] UpdateCategoryRequest request)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Equipment Master"))
            //{
            //    return Forbid("You do not have permission to manage Equipment Master");
            //}

            var (success, message, category) = await _equipmentTypeService.UpdateCategoryAsync(
                categoryId,
                request.Level1,
                request.Level2,
                request.Level3,
                request.Level4,
                request.Level5
            );

            if (!success)
            {
                return BadRequest(new { Message = message });
            }
            var categoryDto = new EquipmentCategoryDto
            {
                Id = category.Id,
                EquipmentTypeId = category.EquipmentTypeId,
                Level1 = category.Level1,
                Level2 = category.Level2,
                Level3 = category.Level3,
                Level4 = category.Level4,
                Level5 = category.Level5,
                CreatedAt = category.CreatedAt,
                UpdatedAt = category.UpdatedAt
            };

            return Ok(new { Message = message, Category = categoryDto });
        }

        [HttpDelete("equipment-types/categories/{categoryId}")]
        public async Task<IActionResult> DeleteCategory(int categoryId)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Equipment Master"))
            //{
            //    return Forbid("You do not have permission to manage Equipment Master");
            //}

            var (success, message) = await _equipmentTypeService.DeleteCategoryAsync(categoryId);
            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return Ok(new { Message = message });
        }

        [HttpGet("equipment-types/{equipmentTypeId}/export-categories")]
        public async Task<IActionResult> ExportCategories(int equipmentTypeId)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Equipment Master"))
            //{
            //    return Forbid("You do not have permission to manage Equipment Master");
            //}

            var (success, message, fileContent) = await _equipmentTypeService.ExportCategoriesToExcelAsync(equipmentTypeId);
            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Categories.xlsx");
        }

        [HttpPost("equipment-types/{equipmentTypeId}/import-categories")]
        public async Task<IActionResult> ImportCategories(int equipmentTypeId, IFormFile file)
        {
            //var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            //var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            //if (!requester.Permissions.Contains("Equipment Master"))
            //{
            //    return Forbid("You do not have permission to manage Equipment Master");
            //}

            if (file == null || file.Length == 0)
            {
                return BadRequest(new { Message = "No file uploaded" });
            }

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                var fileContent = stream.ToArray();
                var (success, message, categories) = await _equipmentTypeService.ImportCategoriesFromExcelAsync(equipmentTypeId, fileContent);
                if (!success)
                {
                    return BadRequest(new { Message = message });
                }

                return Ok(new { Message = message, Categories = categories });
            }
        }

        [HttpGet("export-locations")]
        public async Task<IActionResult> ExportLocations()
        {
            var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            if (!requester.Permissions.Contains("Location Master"))
            {
                return Forbid("You do not have permission to manage Location Master");
            }

            var (success, message, fileContent) = await _locationService.ExportLocationsToExcelAsync();
            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Locations.xlsx");
        }

        [HttpPost("import-locations")]
        public async Task<IActionResult> ImportLocations(IFormFile file)
        {
            var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            if (!requester.Permissions.Contains("Location Master"))
            {
                return Forbid("You do not have permission to manage Location Master");
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest(new { Message = "No file uploaded" });
            }

            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                var fileContent = stream.ToArray();
                var (success, message) = await _locationService.ImportLocationsFromExcelAsync(fileContent);
                if (!success)
                {
                    return BadRequest(new { Message = message });
                }

                return Ok(new { Message = message });
            }
        }

        [HttpGet("billing-report/robo-list")]
        public async Task<IActionResult> GetBillingReportRoBoList()
        {
            var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            if (!requester.Permissions.Contains("Billing Report"))
            {
                return Forbid("You do not have permission to access Billing Report");
            }

            var roBoList = await _billingReportService.GetRoBoListAsync();
            return Ok(new { RoBoList = roBoList });
        }

        [HttpGet("billing-report")]
        public async Task<IActionResult> GetBillingReport([FromQuery] string roBo, [FromQuery] string month, [FromQuery] int year)
        {
            var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            if (!requester.Permissions.Contains("Billing Report"))
            {
                return Forbid("You do not have permission to access Billing Report");
            }

            var (success, message, reports, totalBasicAmount, totalWithGst) = await _billingReportService.GetBillingReportsAsync(roBo, month, year);
            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return Ok(new
            {
                Reports = reports,
                TotalBasicAmount = totalBasicAmount,
                TotalWithGst = totalWithGst
            });
        }

        [HttpGet("billing-report/export")]
        public async Task<IActionResult> ExportBillingReport([FromQuery] string roBo, [FromQuery] string month, [FromQuery] int year)
        {
            var requesterId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var requester = await _mstcAdminService.GetMstcUserByIdAsync(requesterId);
            if (!requester.Permissions.Contains("Billing Report"))
            {
                return Forbid("You do not have permission to access Billing Report");
            }

            var (success, message, fileContent) = await _billingReportService.ExportBillingReportsToExcelAsync(roBo, month, year);
            if (!success)
            {
                return BadRequest(new { Message = message });
            }

            return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"BillingReport_{roBo}_{month}_{year}.xlsx");
        }
    }

    public class RegisterMstcUserRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Name { get; set; }
        public string RoBo { get; set; }
        public List<string> Permissions { get; set; }
    }

    public class RegisterSupplierRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Name { get; set; }
        public string BusinessType { get; set; }
    }

    public class UpdateUserRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public List<string> Permissions { get; set; }
        public string RoBo { get; set; }
    }

    public class AddEquipmentRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string SerialNumber { get; set; }
        public int LocationId { get; set; }
        public decimal RentalRate { get; set; }
        public string Status { get; set; }
    }

    public class UpdateEquipmentRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string SerialNumber { get; set; }
        public int LocationId { get; set; }
        public decimal RentalRate { get; set; }
        public string Status { get; set; }
    }

    public class AddLocationRequest
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PinCode { get; set; }
    }

    public class UpdateLocationRequest
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PinCode { get; set; }
    }

    public class AddEquipmentTypeRequest
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; }
    }

    public class UpdateEquipmentTypeRequest
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; }
    }

    public class AddCategoryRequest
    {
        public string Level1 { get; set; }
        public string Level2 { get; set; }
        public string Level3 { get; set; }
        public string Level4 { get; set; }
        public string Level5 { get; set; }
    }

    public class UpdateCategoryRequest
    {
        public string Level1 { get; set; }
        public string Level2 { get; set; }
        public string Level3 { get; set; }
        public string Level4 { get; set; }
        public string Level5 { get; set; }
    }
}