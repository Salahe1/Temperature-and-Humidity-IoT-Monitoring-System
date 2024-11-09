using Microsoft.AspNetCore.Mvc;
using TempHumidTrackerAPI.Models;



namespace TempHumidTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherDataController : ControllerBase
    {

        private readonly BDContext _context;

        public WeatherDataController(BDContext _context)
        {
            this._context = _context;
        }


        [HttpGet("Get")] // Unique route for weather data
        public IActionResult GetWeatherData()
        {
            var weatherDataList = _context.WeatherData.ToList();

            if (weatherDataList == null || !weatherDataList.Any())
            {
                return NotFound("No weather data found.");
            }

            return Ok(weatherDataList);
        }

        [HttpPost]
        public IActionResult PostWeatherData([FromBody] WeatherData reading)
        {   
                if (reading == null)
                {
                    return BadRequest("Invalid data.");
                }          

            _context.WeatherData.Add(reading);
            _context.SaveChanges();

            return Ok("Data received and saved successfully.");
        }




       


    }
}
