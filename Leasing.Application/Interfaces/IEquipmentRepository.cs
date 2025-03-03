using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Leasing.Domain.Entities;

namespace Leasing.Application.Interfaces
{
    public interface IEquipmentRepository
    {
        Task<List<Equipment>> SearchAsync(string category, string brand, string location);
        Task<Equipment> AddAsync(Equipment equipment);
    }
}
