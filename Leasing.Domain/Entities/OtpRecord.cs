using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Domain.Entities
{
    public class OtpRecord
    {
        public int Id { get; set; }
        public string Identifier { get; set; }
        public string OtpCode { get; set; }
        public DateTime ExpiresAt { get; set; }
        public bool IsUsed { get; set; }
    }
}