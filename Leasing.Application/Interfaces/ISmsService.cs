using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Application.Interfaces
{
    public interface ISmsService
    {
        Task SendAsync(string to, string message);
    }
}
