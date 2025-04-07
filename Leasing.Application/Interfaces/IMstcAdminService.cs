using Leasing.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Leasing.Application.Interfaces
{
    public interface IMstcAdminService
    {
        Task<List<User>> GetAllUsersAsync();
        Task<List<User>> GetAllMstcUsersAsync(); // New method
        Task<User> GetMstcUserByIdAsync(int userId); // New method
      // Task<(bool Success, string Message, User User)> RegisterSupplierAsync(string username, string password, string email, string phone, string name, string businessType);
        Task<(bool Success, string Message, User User)> UpdateUserAsync(int userId, string name, string email, string phone, List<string> permissions, string roBo);
        Task<(bool Success, string Message)> DeleteUserAsync(int userId); // New method
        //Task<List<Equipment>> GetAllEquipmentAsync();
        //Task<(bool Success, string Message, Equipment Equipment)> AddEquipmentAsync(string name, string description, string category, string serialNumber, int locationId, decimal rentalRate, string status);
        //Task<(bool Success, string Message, Equipment Equipment)> UpdateEquipmentAsync(int equipmentId, string name, string description, string category, string serialNumber, int locationId, decimal rentalRate, string status);
        //Task<List<Location>> GetAllLocationsAsync();
        //Task<(bool Success, string Message, Location Location)> AddLocationAsync(string name, string address, string city, string state, string country, string pinCode);
        //Task<(bool Success, string Message, Location Location)> UpdateLocationAsync(int locationId, string name, string address, string city, string state, string country, string pinCode);
        //Task<object> GetBillingReportAsync();
        //Task<object> GetSupplierMisAsync();
        //Task<object> GetProductMisAsync();
        //Task<object> GetUserMisAsync();
        //Task<object> GetNotificationsAsync();
        //Task<object> GetServiceChargeModuleAsync();
        Task<List<string>> GetRoBoListAsync();
        Task<List<User>> GetUsersByRoBoAsync(string roBo);
        Task<List<string>> GetPermissionsListAsync();
        Task<User> GetUserByIdAsync(int id);
    }
}