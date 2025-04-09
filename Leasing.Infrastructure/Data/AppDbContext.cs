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
            //modelBuilder.Entity<User>()
            //    .HasDiscriminator<string>("Role")
            //    .HasValue<MstcUser>("MSTC")
            //    .HasValue<BrandUser>("Brand");

            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<MstcUser>().ToTable("MstcUsers").HasBaseType<User>();
            modelBuilder.Entity<BrandUser>().ToTable("BrandUsers").HasBaseType<User>();

            modelBuilder.Entity<Product>()
                .ToTable("Products");

            modelBuilder.Entity<Product>()
                .Property(p => p.Brand)
                .HasMaxLength(100);

            modelBuilder.Entity<Product>()
                .Property(p => p.Model)
                .HasMaxLength(100);

            modelBuilder.Entity<Product>()
                .Property(p => p.YouTubeLink)
                .HasMaxLength(255);

            modelBuilder.Entity<Product>()
                .Property(p => p.Description)
                .HasMaxLength(1000);

            modelBuilder.Entity<Product>()
                .Property(p => p.Specifications)
                .HasMaxLength(1000);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.EquipmentType)
                .WithMany()
                .HasForeignKey(p => p.EquipmentTypeId);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.EquipmentCategory)
                .WithMany()
                .HasForeignKey(p => p.EquipmentCategoryId);

            modelBuilder.Entity<Image>()
                .ToTable("Images")
                .HasKey(i => i.Id);

            modelBuilder.Entity<Image>()
                .Property(i => i.FilePath)
                .HasMaxLength(255);

            modelBuilder.Entity<Image>()
                .HasOne(i => i.Product)
                .WithMany(p => p.Images)
                .HasForeignKey(i => i.ProductId);

            modelBuilder.Entity<EquipmentType>()
                .ToTable("EquipmentTypes");

            modelBuilder.Entity<EquipmentType>()
                .Property(et => et.SystemId)
                .HasMaxLength(50);

            modelBuilder.Entity<EquipmentType>()
                .Property(et => et.Name)
                .HasMaxLength(100);

            modelBuilder.Entity<EquipmentType>()
                .Property(et => et.Code)
                .HasMaxLength(10);

            modelBuilder.Entity<EquipmentCategory>()
                .ToTable("EquipmentCategories");

            modelBuilder.Entity<EquipmentCategory>()
                .Property(ec => ec.Level1)
                .HasMaxLength(100);

            modelBuilder.Entity<EquipmentCategory>()
                .Property(ec => ec.Level2)
                .HasMaxLength(100);

            modelBuilder.Entity<EquipmentCategory>()
                .Property(ec => ec.Level3)
                .HasMaxLength(100);

            modelBuilder.Entity<EquipmentCategory>()
                .Property(ec => ec.Level4)
                .HasMaxLength(100);

            modelBuilder.Entity<EquipmentCategory>()
                .Property(ec => ec.Level5)
                .HasMaxLength(100);

            modelBuilder.Entity<EquipmentCategory>()
                .HasOne(ec => ec.EquipmentType)
                .WithMany(et => et.Categories)
                .HasForeignKey(ec => ec.EquipmentTypeId);
        }
            
        }
}
