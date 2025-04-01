using Leasing.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Leasing.Domain.Interfaces
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetAllLocationsAsync();
        Task<Location> GetLocationByPincodeAsync(string pincode);
        Task AddLocationAsync(Location location);
        Task UpdateLocationAsync(Location location);
    }
}