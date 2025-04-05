using Leasing.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Leasing.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Log> Logs { get; set; }

        //public DbSet<Equipment> Equipments { get; set; }
        public DbSet<EquipmentCategory> EquipmentCategories { get; set; }
        public DbSet<EquipmentType> EquipmentTypes { get; set; }
        public DbSet<BillingReport> BillingReports { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Product> Products { get; set; } 
        public DbSet<Image> Images { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure TPH for User hierarchy
            modelBuilder.Entity<User>()
                .HasDiscriminator<string>("Role")
                .HasValue<MstcUser>("MSTC")
                .HasValue<BrandUser>("Brand");
        }
            //protected override void OnModelCreating(ModelBuilder modelBuilder)
            //{
            //    modelBuilder.Entity<User>(entity =>
            //    {
            //        entity.HasKey(e => e.Id);
            //        entity.Property(e => e.Phone).IsRequired().HasMaxLength(20);
            //        entity.HasIndex(e => e.Phone).IsUnique(); // Unique constraint on Phone
            //        entity.Property(e => e.Email).HasMaxLength(100); // Allow null, but enforce uniqueness where provided
            //        entity.HasIndex(e => e.Email).IsUnique(); // Unique constraint on Email (nulls are treated as distinct)
            //        entity.Property(e => e.Name).HasMaxLength(100);
            //        entity.Property(e => e.RegistrationNumber).HasMaxLength(50);
            //        entity.Property(e => e.Role).HasMaxLength(50);
            //        entity.Property(e => e.IsVerified).HasDefaultValue(false);
            //        entity.Property(e => e.CreatedAt).HasDefaultValueSql("GETDATE()");
            //    });
            //    modelBuilder.Entity<Equipment>()
            //        .Property(e => e.Images)
            //        .HasConversion(
            //            v => JsonSerializer.Serialize(v, new JsonSerializerOptions()),
            //            v => JsonSerializer.Deserialize<List<string>>(v, new JsonSerializerOptions()) ?? new List<string>()
            //        );
            //}
        }
}
