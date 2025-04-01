using System;

namespace Leasing.Domain.Entities
{
    public class BillingReport
    {
        public int Id { get; set; }
        public string RoBo { get; set; }
        public string Month { get; set; }
        public int Year { get; set; }
        public string SupplierName { get; set; }
        public string SupplierType { get; set; }
        public string ContractType { get; set; }
        public DateTime ContractStartDate { get; set; }
        public DateTime ContractEndDate { get; set; }
        public decimal BasicAmount { get; set; }
        public bool AtSource { get; set; } // Y/N
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}