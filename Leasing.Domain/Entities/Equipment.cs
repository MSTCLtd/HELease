using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Domain.Entities
{
    public class Equipment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; } // Agricultural, Construction, etc.
        public string SubCategory { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public int SupplierId { get; set; }
        public User Supplier { get; set; }
    }
}
