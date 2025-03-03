namespace Leasing.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string Role { get; set; } // "Buyer", "Supplier", "Admin"
        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpiry { get; set; }
        public string Email { get; set; }
        public string? GstNumber { get; set; }
        public string? PanNumber { get; set; }
    }
}
