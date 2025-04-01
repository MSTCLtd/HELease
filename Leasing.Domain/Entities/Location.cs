using System;

namespace Leasing.Domain.Entities
{
    public class Location
    {
        public int Id { get; set; }
        public string State { get; set; }
        public string District { get; set; }
        public string Pincode { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}