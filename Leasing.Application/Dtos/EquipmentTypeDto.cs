using System;
using System.Collections.Generic;

namespace Leasing.Application.DTOs
{
    public class EquipmentTypeDto
    {
        public int Id { get; set; }
        public string SystemId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<EquipmentCategoryDto> Categories { get; set; } = new List<EquipmentCategoryDto>();
    }
}