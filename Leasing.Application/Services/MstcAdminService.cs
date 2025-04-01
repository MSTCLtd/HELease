using Leasing.Application.Constants;
using Leasing.Application.Interfaces;
using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Leasing.Application.Services
{
    public class MstcAdminService : IMstcAdminService
    {
        private readonly IUserRepository _userRepository;
       
        private readonly ILogger<MstcAdminService> _logger;

        public MstcAdminService(
            IUserRepository userRepository,
            
            ILogger<MstcAdminService> logger)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            //_equipmentRepository = equipmentRepository ?? throw new ArgumentNullException(nameof(equipmentRepository));
            //_locationRepository = locationRepository ?? throw new ArgumentNullException(nameof(locationRepository));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            _logger.LogDebug("Fetching all users for MSTC admin dashboard");
            return await _userRepository.GetAllAsync();
        }

        public async Task<List<User>> GetAllMstcUsersAsync()
        {
            _logger.LogDebug("Fetching all MSTC users");
            return await _userRepository.GetAllMstcUsersAsync();
        }

        public async Task<User> GetMstcUserByIdAsync(int userId)
        {
            _logger.LogDebug("Fetching MSTC user with ID {UserId}", userId);
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null || user.Role != "MSTC")
            {
                _logger.LogWarning("MSTC user with ID {UserId} not found", userId);
                return null;
            }
            return user;
        }

        public async Task<(bool Success, string Message, User User)> RegisterSupplierAsync(string username, string password, string email, string phone, string name, string businessType)
        {
            _logger.LogDebug("RegisterSupplierAsync called with username: {Username}", username);

            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(phone))
            {
                _logger.LogWarning("Required fields missing for Supplier registration");
                return (false, "Username, password, email, and phone are required", null);
            }

            if (!phone.StartsWith("+")) phone = "+91" + phone.TrimStart('0');

            var existingUser = await _userRepository.GetByUsernameAsync(username);
            if (existingUser != null)
            {
                _logger.LogWarning("Username {Username} already exists", username);
                return (false, "Username already exists", null);
            }

            var existingUserWithEmail = await _userRepository.GetByEmailAsync(email);
            if (existingUserWithEmail != null)
            {
                _logger.LogWarning("Email {Email} already exists", email);
                return (false, "Email already exists", null);
            }

            var existingUserWithPhone = await _userRepository.GetByPhoneAsync(phone);
            if (existingUserWithPhone != null)
            {
                _logger.LogWarning("Phone {Phone} already exists", phone);
                return (false, "Phone number already exists", null);
            }

            var user = new User
            {
                Username = username,
                Password = BCrypt.Net.BCrypt.HashPassword(password),
                Email = email,
                Phone = phone,
                Name = name,
                Role = "Brand",
                BusinessType = businessType,
                IsVerified = true,
                IsEmailVerified = true,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                RegistrationNumber = "TEMP"
            };

            try
            {
                await _userRepository.AddAsync(user);
                await _userRepository.SaveChangesAsync();

                user.RegistrationNumber = $"BRND{user.Id:D6}";
                user.UpdatedAt = DateTime.UtcNow;
                await _userRepository.UpdateAsync(user);
                await _userRepository.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Failed to register Supplier due to database error");
                return (false, "Failed to register Supplier", null);
            }

            _logger.LogInformation("Supplier {Username} registered successfully with RegistrationNumber {RegNum}", username, user.RegistrationNumber);
            return (true, "Supplier registered successfully", user);
        }

        public async Task<(bool Success, string Message, User User)> UpdateUserAsync(int userId, string name, string email, string phone, List<string> permissions, string roBo)
        {
            _logger.LogDebug("UpdateUserAsync called for userId: {UserId}", userId);

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                _logger.LogWarning("User not found for userId {UserId}", userId);
                return (false, "User not found", null);
            }

            if (user.Role != "MSTC")
            {
                _logger.LogWarning("User {UserId} is not an MSTC user", userId);
                return (false, "User is not an MSTC user", null);
            }

            if (!string.IsNullOrWhiteSpace(email) && email != user.Email)
            {
                var existingUserWithEmail = await _userRepository.GetByEmailAsync(email);
                if (existingUserWithEmail != null && existingUserWithEmail.Id != userId)
                {
                    _logger.LogWarning("Email {Email} already exists", email);
                    return (false, "Email already exists", null);
                }
                user.Email = email;
            }

            if (!string.IsNullOrWhiteSpace(phone) && phone != user.Phone)
            {
                if (!phone.StartsWith("+")) phone = "+91" + phone.TrimStart('0');
                var existingUserWithPhone = await _userRepository.GetByPhoneAsync(phone);
                if (existingUserWithPhone != null && existingUserWithPhone.Id != userId)
                {
                    _logger.LogWarning("Phone {Phone} already exists", phone);
                    return (false, "Phone number already exists", null);
                }
                user.Phone = phone;
            }

            if (!string.IsNullOrWhiteSpace(name))
            {
                user.Name = name;
            }

            if (!string.IsNullOrWhiteSpace(roBo))
            {
                var roBoList = await GetRoBoListAsync();
                if (!roBoList.Contains(roBo))
                {
                    _logger.LogWarning("Invalid RO/BO {RoBo} for userId {UserId}", roBo, userId);
                    return (false, "Invalid RO/BO", null);
                }
                user.RoBo = roBo;
            }

            if (permissions != null)
            {
                if (permissions.Any(p => !PermissionConstants.Permissions.Contains(p)))
                {
                    _logger.LogWarning("Invalid permissions provided for userId {UserId}", userId);
                    return (false, "Invalid permissions", null);
                }
                user.Permissions = permissions;
            }

            user.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _userRepository.UpdateAsync(user);
                await _userRepository.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Failed to update user {UserId} due to database error", userId);
                return (false, "Failed to update user", null);
            }

            _logger.LogInformation("User {UserId} updated successfully", userId);
            return (true, "User updated successfully", user);
        }

        public async Task<(bool Success, string Message)> DeleteUserAsync(int userId)
        {
            _logger.LogDebug("DeleteUserAsync called for userId: {UserId}", userId);

            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                _logger.LogWarning("User not found for userId {UserId}", userId);
                return (false, "User not found");
            }

            if (user.Role != "MSTC")
            {
                _logger.LogWarning("User {UserId} is not an MSTC user", userId);
                return (false, "User is not an MSTC user");
            }

            try
            {
                await _userRepository.DeleteAsync(userId);
                await _userRepository.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                _logger.LogError(ex, "Failed to delete user {UserId} due to database error", userId);
                return (false, "Failed to delete user");
            }

            _logger.LogInformation("User {UserId} deleted successfully", userId);
            return (true, "User deleted successfully");
        }

        //public async Task<List<Equipment>> GetAllEquipmentAsync()
        //{
        //    _logger.LogDebug("Fetching all equipment for MSTC admin dashboard");
        //    return await _equipmentRepository.GetAllAsync();
        //}

        //public async Task<(bool Success, string Message, Equipment Equipment)> AddEquipmentAsync(string name, string description, string category, string serialNumber, int locationId, decimal rentalRate, string status)
        //{
        //    _logger.LogDebug("AddEquipmentAsync called with name: {Name}", name);

        //    if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(category) || string.IsNullOrWhiteSpace(serialNumber) || string.IsNullOrWhiteSpace(status))
        //    {
        //        _logger.LogWarning("Required fields missing for equipment");
        //        return (false, "Name, category, serial number, and status are required", null);
        //    }

        //    var location = await _locationRepository.GetByIdAsync(locationId);
        //    if (location == null)
        //    {
        //        _logger.LogWarning("Location {LocationId} not found", locationId);
        //        return (false, "Location not found", null);
        //    }

        //    var equipment = new Equipment
        //    {
        //        Name = name,
        //        Description = description,
        //        Category = category,
        //        SerialNumber = serialNumber,
        //        LocationId = locationId,
        //        RentalRate = rentalRate,
        //        Status = status,
        //        CreatedAt = DateTime.UtcNow,
        //        UpdatedAt = DateTime.UtcNow
        //    };

        //    try
        //    {
        //        await _equipmentRepository.AddAsync(equipment);
        //        await _equipmentRepository.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        _logger.LogError(ex, "Failed to add equipment due to database error");
        //        return (false, "Failed to add equipment", null);
        //    }

        //    _logger.LogInformation("Equipment {Name} added successfully", name);
        //    return (true, "Equipment added successfully", equipment);
        //}

        //public async Task<(bool Success, string Message, Equipment Equipment)> UpdateEquipmentAsync(int equipmentId, string name, string description, string category, string serialNumber, int locationId, decimal rentalRate, string status)
        //{
        //    _logger.LogDebug("UpdateEquipmentAsync called for equipmentId: {EquipmentId}", equipmentId);

        //    var equipment = await _equipmentRepository.GetByIdAsync(equipmentId);
        //    if (equipment == null)
        //    {
        //        _logger.LogWarning("Equipment not found for equipmentId {EquipmentId}", equipmentId);
        //        return (false, "Equipment not found", null);
        //    }

        //    var location = await _locationRepository.GetByIdAsync(locationId);
        //    if (location == null)
        //    {
        //        _logger.LogWarning("Location {LocationId} not found", locationId);
        //        return (false, "Location not found", null);
        //    }

        //    if (!string.IsNullOrWhiteSpace(name)) equipment.Name = name;
        //    if (!string.IsNullOrWhiteSpace(description)) equipment.Description = description;
        //    if (!string.IsNullOrWhiteSpace(category)) equipment.Category = category;
        //    if (!string.IsNullOrWhiteSpace(serialNumber)) equipment.SerialNumber = serialNumber;
        //    if (!string.IsNullOrWhiteSpace(status)) equipment.Status = status;
        //    equipment.LocationId = locationId;
        //    equipment.RentalRate = rentalRate;
        //    equipment.UpdatedAt = DateTime.UtcNow;

        //    try
        //    {
        //        await _equipmentRepository.UpdateAsync(equipment);
        //        await _equipmentRepository.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        _logger.LogError(ex, "Failed to update equipment {EquipmentId} due to database error", equipmentId);
        //        return (false, "Failed to update equipment", null);
        //    }

        //    _logger.LogInformation("Equipment {EquipmentId} updated successfully", equipmentId);
        //    return (true, "Equipment updated successfully", equipment);
        //}

        //public async Task<List<Location>> GetAllLocationsAsync()
        //{
        //    _logger.LogDebug("Fetching all locations for MSTC admin dashboard");
        //    return await _locationRepository.GetAllAsync();
        //}

        //public async Task<(bool Success, string Message, Location Location)> AddLocationAsync(string name, string address, string city, string state, string country, string pinCode)
        //{
        //    _logger.LogDebug("AddLocationAsync called with name: {Name}", name);

        //    if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(address) || string.IsNullOrWhiteSpace(city) || string.IsNullOrWhiteSpace(state) || string.IsNullOrWhiteSpace(country))
        //    {
        //        _logger.LogWarning("Required fields missing for location");
        //        return (false, "Name, address, city, state, and country are required", null);
        //    }

        //    var location = new Location
        //    {
        //        Name = name,
        //        Address = address,
        //        City = city,
        //        State = state,
        //        Country = country,
        //        PinCode = pinCode,
        //        CreatedAt = DateTime.UtcNow,
        //        UpdatedAt = DateTime.UtcNow
        //    };

        //    try
        //    {
        //        await _locationRepository.AddAsync(location);
        //        await _locationRepository.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        _logger.LogError(ex, "Failed to add location due to database error");
        //        return (false, "Failed to add location", null);
        //    }

        //    _logger.LogInformation("Location {Name} added successfully", name);
        //    return (true, "Location added successfully", location);
        //}

        //public async Task<(bool Success, string Message, Location Location)> UpdateLocationAsync(int locationId, string name, string address, string city, string state, string country, string pinCode)
        //{
        //    _logger.LogDebug("UpdateLocationAsync called for locationId: {LocationId}", locationId);

        //    var location = await _locationRepository.GetByIdAsync(locationId);
        //    if (location == null)
        //    {
        //        _logger.LogWarning("Location not found for locationId {LocationId}", locationId);
        //        return (false, "Location not found", null);
        //    }

        //    if (!string.IsNullOrWhiteSpace(name)) location.Name = name;
        //    if (!string.IsNullOrWhiteSpace(address)) location.Address = address;
        //    if (!string.IsNullOrWhiteSpace(city)) location.City = city;
        //    if (!string.IsNullOrWhiteSpace(state)) location.State = state;
        //    if (!string.IsNullOrWhiteSpace(country)) location.Country = country;
        //    if (!string.IsNullOrWhiteSpace(pinCode)) location.PinCode = pinCode;
        //    location.UpdatedAt = DateTime.UtcNow;

        //    try
        //    {
        //        await _locationRepository.UpdateAsync(location);
        //        await _locationRepository.SaveChangesAsync();
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        _logger.LogError(ex, "Failed to update location {LocationId} due to database error", locationId);
        //        return (false, "Failed to update location", null);
        //    }

        //    _logger.LogInformation("Location {LocationId} updated successfully", locationId);
        //    return (true, "Location updated successfully", location);
        //}

        public async Task<List<string>> GetRoBoListAsync()
        {
            var users = await _userRepository.GetAllAsync();
            var roBoList = users.Where(u => u.Role == "MSTC" && !string.IsNullOrWhiteSpace(u.RoBo))
                               .Select(u => u.RoBo)
                               .Distinct()
                               .ToList();
            return roBoList;
        }

        public async Task<List<User>> GetUsersByRoBoAsync(string roBo)
        {
            if (string.IsNullOrWhiteSpace(roBo))
            {
                return new List<User>();
            }
            return await _userRepository.GetUsersByRoBoAsync(roBo);
        }

        public async Task<List<string>> GetPermissionsListAsync()
        {
            await Task.CompletedTask;
            return PermissionConstants.Permissions;
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<object> GetBillingReportAsync()
        {
            await Task.CompletedTask;
            return new { Message = "Billing Report feature not yet implemented" };
        }

        public async Task<object> GetSupplierMisAsync()
        {
            await Task.CompletedTask;
            return new { Message = "Supplier MIS feature not yet implemented" };
        }

        public async Task<object> GetProductMisAsync()
        {
            await Task.CompletedTask;
            return new { Message = "Product MIS feature not yet implemented" };
        }

        public async Task<object> GetUserMisAsync()
        {
            await Task.CompletedTask;
            return new { Message = "User MIS feature not yet implemented" };
        }

        public async Task<object> GetNotificationsAsync()
        {
            await Task.CompletedTask;
            return new { Message = "Notifications feature not yet implemented" };
        }

        public async Task<object> GetServiceChargeModuleAsync()
        {
            await Task.CompletedTask;
            return new { Message = "Service Charge Module feature not yet implemented" };
        }
    }
}