using Leasing.Application.Interfaces;
using Leasing.Application.Services;
using Leasing.Domain.Interfaces;
using Leasing.Infrastructure.Data;
using Leasing.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Sinks.MSSqlServer;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//builder.Host.UseSerilog((context, configuration) =>
//{
//    configuration
//        .ReadFrom.Configuration(context.Configuration) // Load settings from appsettings.json
//        .WriteTo.Console() // Log to console
//        .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day); // Log to daily files
//});

Serilog.Debugging.SelfLog.Enable(Console.Error); // Add at the top
builder.Host.UseSerilog((context, configuration) =>
{
    configuration
        .MinimumLevel.Information()
        .MinimumLevel.Override("Microsoft", Serilog.Events.LogEventLevel.Warning)
        .MinimumLevel.Override("System", Serilog.Events.LogEventLevel.Warning)
        .WriteTo.Console()
        
        .WriteTo.MSSqlServer(
            connectionString: context.Configuration.GetConnectionString("DefaultConnection"),
            sinkOptions: new MSSqlServerSinkOptions { TableName = "Logs", AutoCreateSqlTable = false });
});
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
//builder.Services.AddTransient<IEmailService, EmailService>();
// JWT Configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddTransient<ISmsService, SmsService>();
builder.Services.AddMemoryCache();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseSerilogRequestLogging();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();