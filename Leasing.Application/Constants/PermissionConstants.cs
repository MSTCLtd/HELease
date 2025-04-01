using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Application.Constants
{
    public static class PermissionConstants
    {
        public static readonly List<string> Permissions = new List<string>
        {
            "Add / Edit MSTC Users", // Previously "ManageUsers"
            "Add / Edit Vendor Contracts",
            "Equipment Master",
            "Location Master",
            "Vendor MIS",
            "Product MIS",
            "User MIS",
            "Billing Report",
            "SMSEs",
            "Notifications"
        };
    }
}
