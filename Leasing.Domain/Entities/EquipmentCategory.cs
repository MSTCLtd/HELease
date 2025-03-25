using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Domain.Entities
{
    public class EquipmentCategory
    {
        public int Id { get; set; }
        public int EquipmentTypeId { get; set; }
        public EquipmentType EquipmentType { get; set; }
        public string Level1 { get; set; } // e.g., "Farming Equipment"
        public string Level2 { get; set; } // e.g., "Tractors"
        public string Level3 { get; set; } // e.g., "0-2 Tons"
        public string Level4 { get; set; } // e.g., "Manual"
        public string Level5 { get; set; } // e.g., "With Baler"
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
