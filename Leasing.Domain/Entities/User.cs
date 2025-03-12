namespace Leasing.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Phone { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; } // Changed to required
        public string? RegistrationNumber { get; set; }
        public string? Role { get; set; }
        public bool IsVerified { get; set; }
        public bool IsEmailVerified { get; set; } // New property to track email verification
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
