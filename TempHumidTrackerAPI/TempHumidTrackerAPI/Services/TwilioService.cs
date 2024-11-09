namespace TempHumidTrackerAPI.Services
{
    using Twilio;
    using Twilio.Rest.Api.V2010.Account;
    using Twilio.Types;

    public class TwilioService
    {
        private readonly string _accountSid;
        private readonly string _authToken;

        //public TwilioService(string accountSid, string authToken)
        //{
        //    _accountSid = accountSid;
        //    _authToken = authToken;

        //    TwilioClient.Init(_accountSid, _authToken);
        //}

        public void SendWhatsAppMessage(string to, string messageBody)
        {
            var message = MessageResource.Create(
                body: messageBody,
                from: new PhoneNumber("whatsapp:+14155238886"), // Twilio Sandbox WhatsApp number
                to: new PhoneNumber($"whatsapp:{to}")
            );
        }
    }

}
