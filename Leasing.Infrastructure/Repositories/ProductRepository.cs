﻿using Leasing.Domain.Entities;
using Leasing.Domain.Interfaces;
using Leasing.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Leasing.Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products
                .Include(p => p.EquipmentType)
                .Include(p => p.EquipmentCategory)
                .Include(p => p.Images)
                .ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.EquipmentType)
                .Include(p => p.EquipmentCategory)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Product>> GetProductsByTypeAsync(int equipmentTypeId)
        {
            return await _context.Products
                .Include(p => p.EquipmentType)
                .Include(p => p.EquipmentCategory)
                .Include(p => p.Images)
                .Where(p => p.EquipmentTypeId == equipmentTypeId)
                .ToListAsync();
        }

        public async Task<List<Product>> GetProductsByTypeAndBrandAsync(int equipmentTypeId, string brand)
        {
            return await _context.Products
                .Include(p => p.EquipmentType)
                .Include(p => p.EquipmentCategory)
                .Include(p => p.Images)
                .Where(p => p.EquipmentTypeId == equipmentTypeId && p.Brand == brand)
                .ToListAsync();
        }

        public async Task<Product> GetProductByTypeBrandAndModelAsync(int equipmentTypeId, string brand, string model)
        {
            return await _context.Products
                .Include(p => p.EquipmentType)
                .Include(p => p.EquipmentCategory)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.EquipmentTypeId == equipmentTypeId && p.Brand == brand && p.Model == model);
        }

        public async Task AddProductAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}