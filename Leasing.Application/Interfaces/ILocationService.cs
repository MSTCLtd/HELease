using System.Threading.Tasks;

namespace Leasing.Application.Interfaces
{
    public interface ILocationService
    {
        Task<(bool Success, string Message, byte[] FileContent)> ExportLocationsToExcelAsync();
        Task<(bool Success, string Message)> ImportLocationsFromExcelAsync(byte[] fileContent);
    }
}