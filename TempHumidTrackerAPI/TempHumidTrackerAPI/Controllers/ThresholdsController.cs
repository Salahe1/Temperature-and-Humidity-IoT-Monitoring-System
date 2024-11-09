using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using TempHumidTrackerAPI.Models;
using TempHumidTrackerAPI.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TempHumidTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ThresholdsController : ControllerBase
    {

        private readonly BDContext _context;
        private readonly AlarmService _alarmService;
        private readonly IServiceProvider _serviceProvider; // Inject IServiceProvider

        public ThresholdsController(BDContext _context, AlarmService _alarmService, IServiceProvider _serviceProvider)
        {
            this._context = _context;
            this._alarmService = _alarmService;
            this._serviceProvider = _serviceProvider;
        }
       
        [HttpGet("GetLastTemperature")]
        public IActionResult GetLastTemperature()
        {
            //  var lastTemperature = _context.WeatherData.LastOrDefault();
            var lastTemperature = _context.WeatherData
                                .AsNoTracking()
                                .OrderByDescending(t => t.Id) // or the timestamp column, if any
                                .FirstOrDefault();


            var thresholds = _context.TemperatureThresholds.FirstOrDefault();

            _alarmService.ProcessTemperature((decimal)lastTemperature.Temperature, thresholds);

            if (lastTemperature == null)
            {
                return NotFound("No weather data found.");
            }

            return Ok(lastTemperature.Temperature);
        }

        [HttpGet("GetTemperatureThresholds")]
        public IActionResult GetTemperatureThresholds()
        {
            var thresholds = _context.TemperatureThresholds.FirstOrDefault();
            if (thresholds == null)
            {
                return NotFound();
            }
            return Ok(thresholds);
        }

        // POST: api/threshold
        [HttpPost]
        public ActionResult SaveThreshold([FromBody] TemperatureThreshold thresholds)
        {
            if (thresholds == null)
            {
                return BadRequest("Invalid threshold data.");
            }

            var existingThresholds = _context.TemperatureThresholds.ToList();
            if (existingThresholds.Any())
            {
                _context.TemperatureThresholds.RemoveRange(existingThresholds); // Remove existing thresholds
            }

            // Add the new thresholds
            _context.TemperatureThresholds.Add(thresholds);
            _context.SaveChanges();

            return Ok(new { message = "Thresholds updated successfully." });

        }


        [HttpGet("GetConsecutiveAlarms")]
        public IActionResult GetConsecutiveAlarms()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var alarmService = scope.ServiceProvider.GetRequiredService<AlarmService>();
                int consecutiveAlarms = alarmService.ConsecutiveAlarms;

                return Ok(new { ConsecutiveAlarms = consecutiveAlarms });
            }
        }

    }
}
