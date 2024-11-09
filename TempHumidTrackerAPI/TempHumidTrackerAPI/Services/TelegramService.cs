namespace TempHumidTrackerAPI.Services
{
    using Telegram.Bot;
    using Telegram.Bot.Types;

    public class TelegramService
    {
        private readonly TelegramBotClient _botClient;

        // Constructor to initialize the TelegramBotClient with the token
        public TelegramService()
        {
            _botClient = new TelegramBotClient("7622565901:AAHOvcsosY5ZrU-_lh5zz4INhdDsBjZH-aU");
        }

        public async Task SendTelegramMessage(long chatId, string messageBody)
        {
            await _botClient.SendTextMessageAsync(chatId, messageBody);
        }
    }

}
