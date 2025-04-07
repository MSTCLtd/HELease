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

        public DbSet<BrandUser> BrandUser { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure TPH for User hierarchy
            modelBuilder.Entity<User>()
                .HasDiscriminator<string>("Role")
                .HasValue<MstcUser>("MSTC")
                .HasValue<BrandUser>("Brand");
        }
            
        }
}
