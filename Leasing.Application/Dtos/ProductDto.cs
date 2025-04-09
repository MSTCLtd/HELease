using System.Collections.Generic;

namespace Leasing.Application.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public int EquipmentTypeId { get; set; }
        public string EquipmentTypeName { get; set; }
        public string EquipmentTypeCode { get; set; }
        public int? EquipmentCategoryId { get; set; }
        public string EquipmentCategoryLevel1 { get; set; }
        public string EquipmentCategoryLevel2 { get; set; }
        public string EquipmentCategoryLevel3 { get; set; }
        public string EquipmentCategoryLevel4 { get; set; }
        public string EquipmentCategoryLevel5 { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public string YouTubeLink { get; set; }
        public string Description { get; set; }
        public string Specifications { get; set; }
        public List<string> ImagePaths { get; set; } = new List<string>(); // Updated to match FilePath
    }
}