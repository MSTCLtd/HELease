using Leasing.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Leasing.Application.Interfaces
{
    public interface IBillingReportService
    {
        Task<List<string>> GetRoBoListAsync();
        Task<(bool Success, string Message, List<BillingReport> Reports, decimal TotalBasicAmount, decimal TotalWithGst)> GetBillingReportsAsync(string roBo, string month, int year);
        Task<(bool Success, string Message, byte[] FileContent)> ExportBillingReportsToExcelAsync(string roBo, string month, int year);
    }
}