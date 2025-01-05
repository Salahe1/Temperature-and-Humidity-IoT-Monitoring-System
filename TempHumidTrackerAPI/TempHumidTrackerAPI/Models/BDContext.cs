using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Writers;

namespace TempHumidTrackerAPI.Models
{
    public class BDContext : DbContext
    {
        public BDContext(DbContextOptions<BDContext> options) : base(options) { }
        
        public DbSet<WeatherData> WeatherData { get; set; }
        public DbSet<TemperatureThreshold> TemperatureThresholds { get; set; } // Add this line
        public DbSet<User> Users { get; set; }
    }
}
 