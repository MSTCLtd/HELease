using System.Collections.Generic;

namespace Leasing.Domain.Entities
{
    public class BrandUser : User
    {
        public string BusinessType { get; set; } // e.g., "Brand", "Manufacturer", "Dealer"
        public string OrganizationPan { get; set; } // From the form
        public string OrganizationName { get; set; } // From the form
        public string SupplierAddress { get; set; } // From the form
        public string PinCode { get; set; } // From the form
        public string District { get; set; } // From the form
        public string State { get; set; } // From the form
        public string ContactPersonName { get; set; } // From the form
        public List<string> EquipmentCategories { get; set; } // e.g., "Agricultural Equipment", "Material Handling"
        public bool IsMsme { get; set; } // From "Are you an MSME?" checkbox
        public bool HasGstRegistration { get; set; } // From "Do you have GST Registration?" checkbox
        public string? GstNumber { get; set; } // Optional GST number if provided
    }
}