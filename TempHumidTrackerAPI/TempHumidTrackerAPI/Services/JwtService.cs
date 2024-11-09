using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TempHumidTrackerAPI.Models;
using TempHumidTrackerAPI.Utils;

namespace TempHumidTrackerAPI.Services
{
    public class JwtService
    {
        private readonly byte[] _secretKey; // Use byte array for the secret key
        private readonly int _expirationMinutes = 60;

        public JwtService()
        {
            // Read the secret key from the environment variable
            var secret = Environment.GetEnvironmentVariable("JWT_SECRET")
                         ?? throw new InvalidOperationException("JWT secret key is not set in environment variables.");

            _secretKey = Encoding.UTF8.GetBytes(secret);
        }


        public string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                // Add other claims as needed
            };

            var key = new SymmetricSecurityKey(_secretKey); // Use the generated key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_expirationMinutes),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
