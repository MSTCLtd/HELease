using Leasing.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Leasing.Domain.Interfaces
{
    public interface IBillingReportRepository
    {
        Task<List<BillingReport>> GetBillingReportsAsync(string roBo, string month, int year);
        Task<List<string>> GetRoBoListAsync();
    }
}