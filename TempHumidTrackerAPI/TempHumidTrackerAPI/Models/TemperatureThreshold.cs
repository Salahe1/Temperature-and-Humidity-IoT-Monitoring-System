using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TempHumidTrackerAPI.Models
{
    public class TemperatureThreshold
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } // Primary key

        public decimal TempNormalMin { get; set; } // Normal Min (°C)
        public decimal TempNormalMax { get; set; } // Normal Max (°C)
        public decimal TempCriticalRange1Min { get; set; } // Critical Range 1 Min (°C)
        public decimal TempCriticalRange1Max { get; set; } // Critical Range 1 Max (°C)
        public decimal TempCriticalRange2Min { get; set; } // Critical Range 2 Min (°C)
        public decimal TempCriticalRange2Max { get; set; } // Critical Range 2 Max (°C)

    }
}
