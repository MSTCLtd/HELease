using System.Collections.Generic;

namespace Leasing.Domain.Entities
{
    public class BrandUser : User
    {
        public bool IsMsme { get; set; }
        public string GstNumber { get; set; }
        public string OrganizationName { get; set; }
        public string Address { get; set; }
        public string PinCode { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string BusinessType { get; set; }
        public List<string> EquipmentCategories { get; set; }
        public string PanNumber { get; set; }
    }
}