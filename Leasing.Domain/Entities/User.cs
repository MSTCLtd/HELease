namespace Leasing.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Phone { get; set; }
        public string Username { get; set; } // New: Required for MSTC/Brand
        public string Password { get; set; } // New: Hashed, required for MSTC/Brand
        public string Name { get; set; }
        public string Email { get; set; }
        public string RegistrationNumber { get; set; }
        public string Role { get; set; } // "User", "Brand", "MSTC"
        public bool IsVerified { get; set; }
        public bool IsEmailVerified { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        // Role-specific fields
        public string? BusinessType { get; set; } // For Brand (e.g., "Brand", "Manufacturer")
        public string? PanNumber { get; set; } // For Brand/MSTC
        public string? GstNumber { get; set; } // For Brand/MSTC
        public string? RoBo { get; set; } // For MSTC (e.g., "HO")
        public List<string>? Permissions { get; set; } = new List<string>(); // For MSTC
    }
}
