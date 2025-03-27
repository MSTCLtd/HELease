using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using Leasing.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Leasing.Infrastructure.Repositories
{
    public class BillingReportRepository : IBillingReportRepository
    {
        private readonly AppDbContext _context;

        public BillingReportRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<BillingReport>> GetBillingReportsAsync(string roBo, string month, int year)
        {
            return await _context.BillingReports
                .Where(br => br.RoBo == roBo && br.Month == month && br.Year == year)
                .ToListAsync();
        }

        public async Task<List<string>> GetRoBoListAsync()
        {
            return await _context.BillingReports
                .Select(br => br.RoBo)
                .Distinct()
                .ToListAsync();
        }
    }
}