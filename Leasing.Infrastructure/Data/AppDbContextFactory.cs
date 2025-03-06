using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace Leasing.Infrastructure.Data;
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        Console.WriteLine("Factory: Entering CreateDbContext"); 
        var builder = new DbContextOptionsBuilder<AppDbContext>();
        var connectionString = "Server=10.1.14.101;Database=HE_Lease;User Id=sa;Password=password@123;MultipleActiveResultSets=true;TrustServerCertificate=True";
        builder.UseSqlServer(connectionString);
        Console.WriteLine("Factory: DbContext created with connection: " + connectionString);
        return new AppDbContext(builder.Options);
    }
}