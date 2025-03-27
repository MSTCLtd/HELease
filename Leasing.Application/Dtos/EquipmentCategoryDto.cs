using System;

namespace Leasing.Application.DTOs
{
    public class EquipmentCategoryDto
    {
        public int Id { get; set; }
        public int EquipmentTypeId { get; set; }
        public string? Level1 { get; set; }
        public string? Level2 { get; set; }
        public string? Level3 { get; set; }
        public string? Level4 { get; set; }
        public string? Level5 { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}