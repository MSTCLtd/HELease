using System;

namespace Leasing.Domain.Entities
{
    public class Image
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string FilePath { get; set; } // Changed from byte[] ImageData to string FilePath
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}