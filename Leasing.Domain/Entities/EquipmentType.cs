using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Domain.Entities
{
    public class EquipmentType
    {
        public int Id { get; set; }
        public string SystemId { get; set; } // e.g., "001"
        public string Name { get; set; } // e.g., "Agricultural Equipment"
        public string Code { get; set; } // e.g., "AE"
        public bool IsActive { get; set; } // e.g., true for Active, false for Deactivated
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<EquipmentCategory> Categories { get; set; } = new List<EquipmentCategory>();
    }
}
