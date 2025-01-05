using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TempHumidTrackerAPI.Models;
using TempHumidTrackerAPI.Services;

var builder = WebApplication.CreateBuilder(args);

IConfiguration Configuration = builder.Configuration;

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod()
              .AllowCredentials(); // If using cookies or tokens
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Service registration
builder.Services.AddSingleton<EmailService>();
builder.Services.AddSingleton<TelegramService>();
builder.Services.AddSingleton<TwilioService>();
builder.Services.AddSingleton<AlarmService>();
builder.Services.AddHostedService<AlarmService>();

builder.Services.AddScoped<JwtService>();
builder.Services.AddDbContext<BDContext>(options =>
    options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

var secret = Environment.GetEnvironmentVariable("JWT_SECRET")
             ?? throw new InvalidOperationException("JWT secret key is not set in environment variables.");
var key = Encoding.UTF8.GetBytes(secret);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowSpecificOrigin");
app.UseAuthentication();  // Ensure this is added before UseAuthorization()
app.UseAuthorization();

app.MapControllers();

app.Run();
