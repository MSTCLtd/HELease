using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Domain.Entities
{
    
        public class MstcUser : User
        {
            public string RoBo { get; set; }
            // Permissions is now inherited from the base User class
        }
    
}
