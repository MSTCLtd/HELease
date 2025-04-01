using ClosedXML.Excel;
using Leasing.Application.Interfaces;
using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace Leasing.Application.Services
{
    public class BillingReportService : IBillingReportService
    {
        private readonly IBillingReportRepository _billingReportRepository;
        private const decimal GstRate = 0.18m; // 18% GST

        public BillingReportService(IBillingReportRepository billingReportRepository)
        {
            _billingReportRepository = billingReportRepository ?? throw new ArgumentNullException(nameof(billingReportRepository));
        }

        public async Task<List<string>> GetRoBoListAsync()
        {
            return await _billingReportRepository.GetRoBoListAsync();
        }

        public async Task<(bool Success, string Message, List<BillingReport> Reports, decimal TotalBasicAmount, decimal TotalWithGst)> GetBillingReportsAsync(string roBo, string month, int year)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(roBo) || string.IsNullOrWhiteSpace(month) || year < 2000 || year > DateTime.UtcNow.Year + 1)
                {
                    return (false, "Invalid RO/BO, month, or year", null, 0, 0);
                }

                var reports = await _billingReportRepository.GetBillingReportsAsync(roBo, month, year);
                if (reports == null || reports.Count == 0)
                {
                    return (false, "No billing reports found for the selected criteria", null, 0, 0);
                }

                decimal totalBasicAmount = reports.Sum(r => r.BasicAmount);
                decimal totalWithGst = totalBasicAmount * (1 + GstRate);

                return (true, "Billing reports retrieved successfully", reports, totalBasicAmount, totalWithGst);
            }
            catch (Exception ex)
            {
                return (false, $"Error retrieving billing reports: {ex.Message}", null, 0, 0);
            }
        }

        public async Task<(bool Success, string Message, byte[] FileContent)> ExportBillingReportsToExcelAsync(string roBo, string month, int year)
        {
            try
            {
                var (success, message, reports, totalBasicAmount, totalWithGst) = await GetBillingReportsAsync(roBo, month, year);
                if (!success)
                {
                    return (false, message, null);
                }

                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Billing Report");

                    // Set headers
                    worksheet.Cell(1, 1).Value = "Supplier Name";
                    worksheet.Cell(1, 2).Value = "Supplier Type";
                    worksheet.Cell(1, 3).Value = "Contract Type";
                    worksheet.Cell(1, 4).Value = "Contract Dates";
                    worksheet.Cell(1, 5).Value = "Basic Amount";
                    worksheet.Cell(1, 6).Value = "At Source";

                    // Populate data
                    for (int i = 0; i < reports.Count; i++)
                    {
                        var report = reports[i];
                        worksheet.Cell(i + 2, 1).Value = report.SupplierName;
                        worksheet.Cell(i + 2, 2).Value = report.SupplierType;
                        worksheet.Cell(i + 2, 3).Value = report.ContractType;
                        worksheet.Cell(i + 2, 4).Value = $"{report.ContractStartDate:dd.MM.yyyy} to {report.ContractEndDate:dd.MM.yyyy}";
                        worksheet.Cell(i + 2, 5).Value = report.BasicAmount;
                        worksheet.Cell(i + 2, 6).Value = report.AtSource ? "Y" : "N";
                    }

                    // Add totals
                    int totalRow = reports.Count + 3;
                    worksheet.Cell(totalRow, 4).Value = "Total";
                    worksheet.Cell(totalRow, 5).Value = totalBasicAmount;
                    worksheet.Cell(totalRow + 1, 4).Value = "Total with GST";
                    worksheet.Cell(totalRow + 1, 5).Value = totalWithGst;

                    // Auto-fit columns
                    worksheet.Columns().AdjustToContents();

                    using (var stream = new MemoryStream())
                    {
                        workbook.SaveAs(stream);
                        return (true, "Exported successfully", stream.ToArray());
                    }
                }
            }
            catch (Exception ex)
            {
                return (false, $"Error exporting billing reports: {ex.Message}", null);
            }
        }
    }
}