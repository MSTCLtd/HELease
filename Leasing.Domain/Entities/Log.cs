using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Domain.Entities
{
    public class Log
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string MessageTemplate { get; set; }
        public string Level { get; set; }
        public DateTime TimeStamp { get; set; }
        public string? Exception { get; set; } // Changed to nullable
        public string Properties { get; set; }
    }
}
