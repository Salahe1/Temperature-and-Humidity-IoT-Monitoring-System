using Microsoft.AspNetCore.Mvc;
using TempHumidTrackerAPI.Models;
using TempHumidTrackerAPI.Services;

namespace TempHumidTrackerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly BDContext _context; // Inject your DbContext
        private readonly JwtService _jwtService;
        
        public AuthController(BDContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _context.Users.SingleOrDefault(u => u.Username == request.Username);

            if (user == null || !VerifyPassword(request.Password, user.Password))
            {
                return Unauthorized();
            }

            var token = _jwtService.GenerateToken(user);
            return Ok(new { token });
        }

        // Dummy password verification, implement actual hashing verification
        private bool VerifyPassword(string enteredPassword, string storedHashedPassword)
        {
            // TODO: Implement password hashing and comparison
            return enteredPassword == storedHashedPassword; // Replace with actual hashing logic
        }
    }

    public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
