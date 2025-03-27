using System;
using System.Collections.Generic;
using static System.Net.Mime.MediaTypeNames;

namespace Leasing.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public int EquipmentTypeId { get; set; }
        public EquipmentType EquipmentType { get; set; }
        public int? EquipmentCategoryId { get; set; }
        public EquipmentCategory EquipmentCategory { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string YouTubeLink { get; set; }
        public string Description { get; set; }
        public string Specifications { get; set; }
        public List<Image> Images { get; set; } = new List<Image>();
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}