namespace Leasing.Domain.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public string BusinessName { get; set; } // Added
    }
}
