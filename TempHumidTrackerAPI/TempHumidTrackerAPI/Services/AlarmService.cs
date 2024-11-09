using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;
using TempHumidTrackerAPI.Models;

namespace TempHumidTrackerAPI.Services
{
    public class AlarmService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly EmailService _emailService;
        private readonly TwilioService _twilioService;
        private readonly TelegramService _telegramService;
        public int ConsecutiveAlarms => consecutiveAlarms;

        private int consecutiveAlarms = 0;

        public AlarmService(IServiceProvider serviceProvider, EmailService emailService, TwilioService twilioService, TelegramService telegramService)
        {
            _serviceProvider = serviceProvider;
            _emailService = emailService;
            _twilioService = twilioService;
            _telegramService = telegramService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);

                using (var scope = _serviceProvider.CreateScope())
                {
                    var dbContext = scope.ServiceProvider.GetRequiredService<BDContext>();

                    var thresholds = await dbContext.TemperatureThresholds
                        .AsNoTracking()
                        .FirstOrDefaultAsync(stoppingToken);

                    if (thresholds == null)
                    {
                        Console.WriteLine("No temperature thresholds found in the database.");
                        continue;
                    }

                    var lastTemperature = await dbContext.WeatherData
                        .AsNoTracking()
                        .OrderByDescending(t => t.Timestamp)
                        .FirstOrDefaultAsync(stoppingToken);

                    if (lastTemperature != null)
                    {
                        ProcessTemperature((decimal)lastTemperature.Temperature, thresholds);
                    }
                }
            }
        }

        public void ProcessTemperature(decimal currentTemperature, TemperatureThreshold thresholds)
        {
            if (IsTemperatureAbnormal(currentTemperature, thresholds))
            {
                consecutiveAlarms++;
                SendAlarmMessageAsync("Operator1");

                if (consecutiveAlarms == 4)
                {
                    SendAlarmMessageAsync("Operator2");
                }
                if (consecutiveAlarms == 7)
                {
                    SendAlarmMessageAsync("Operator3");
                }
            }
            else
            {
                ResetAlarms();
            }
        }

        private bool IsTemperatureAbnormal(decimal temperature, TemperatureThreshold thresholds)
        {
            return temperature < thresholds.TempNormalMin || temperature > thresholds.TempNormalMax;
        }

        private async Task SendAlarmMessageAsync(string operatorRole)
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<BDContext>();
                var user = dbContext.Users.Find(operatorRole);

                if (user != null)
                {
                    string email = user.Email;
                    string subject = "Temperature Alarm Notification";
                    string emailMessageBody = $"Alarm sent to Operator {operatorRole}";
                    _emailService.SendEmail(email, subject, emailMessageBody);

                    long chatId = long.TryParse(user.TelegramId, out var id) ? id : 0;
                    string telegramMessageBody = $"Alarm sent to Operator {operatorRole}";
                    await _telegramService.SendTelegramMessage(chatId, telegramMessageBody);
                }
            }
        }

        private void ResetAlarms()
        {
            consecutiveAlarms = 0;
            Console.WriteLine("Temperature is back to normal. Alarms reset.");
        }
    }
}
