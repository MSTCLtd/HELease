namespace Leasing.Presentation.Models
{
    public class AddEquipmentMasterRequest
    {
        public string EquipmentTypeCode { get; set; }
        public string EquipmentTypeName { get; set; }
        public string Level1 { get; set; }
        public string? Level2 { get; set; }
        public string? Level3 { get; set; }
        public string? Level4 { get; set; }
        public string? Level5 { get; set; }
    }

    public class UpdateEquipmentMasterRequest
    {
        public string Level1 { get; set; }
        public string? Level2 { get; set; }
        public string? Level3 { get; set; }
        public string? Level4 { get; set; }
        public string? Level5 { get; set; }
        public bool IsActive { get; set; }
    }

    public class DeactivateEquipmentTypeRequest
    {
        public string EquipmentTypeCode { get; set; }
    }

    public class ImportEquipmentMastersRequest
    {
        public string EquipmentTypeCode { get; set; }
        public IFormFile File { get; set; }
    }

    public class AddLocationMasterRequest
    {
        public string State { get; set; }
        public string? District { get; set; }
        public string? Pincode { get; set; }
    }

    public class AddEquipmentRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int EquipmentMasterId { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public bool IsAvailable { get; set; }
        public int LocationMasterId { get; set; }
        public List<IFormFile> Images { get; set; }
    }

    public class EditEquipmentRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public bool IsAvailable { get; set; }
        public int LocationMasterId { get; set; }
        public List<IFormFile> Images { get; set; } // Optional: Only if new images are uploaded
    }
}