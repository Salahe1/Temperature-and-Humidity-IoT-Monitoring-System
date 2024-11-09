using System.Security.Cryptography;

namespace TempHumidTrackerAPI.Utils
{
    public static class KeyGenerator
    {
        public static string GenerateRandomKey(int size)
        {
            var key = new byte[size];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(key);
            }
            return Convert.ToBase64String(key);
        }
    }
}
