namespace TempHumidTrackerAPI.Services
{
    using MailKit.Net.Smtp;
    using MimeKit;
    using Microsoft.Extensions.Configuration;

    public class EmailService
    {
        private readonly string _smtpServer = "smtp.gmail.com";
        private readonly int _smtpPort = 587;
        private readonly string _username = "eddinesalah1999@gmail.com";
        private readonly string _password = "iovv rfzk nyqp wsuw";

        //public EmailService(string smtpServer, int smtpPort, string username, string password)
        //{
        //    _smtpServer = configuration["EmailSettings:SmtpServer"];
        //    _smtpPort = int.Parse(configuration["EmailSettings:SmtpPort"]);
        //    _username = configuration["EmailSettings:Username"];
        //    _password = configuration["EmailSettings:Password"];
        //}

        public void SendEmail(string toEmail, string subject, string messageBody)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Alert System", _username));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;

            message.Body = new TextPart("html")
            {
                Text = messageBody
            };

            using (var client = new SmtpClient())
            {
                client.Connect(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
                client.Authenticate(_username, _password);
                client.Send(message);
                client.Disconnect(true);
            }
        }
    }

}

/*
_smtpHost = "smtp.gmail.com";
private readonly int _smtpPort = 587;
private readonly string _smtpUser = "eddinesalah1999@gmail.com";
private readonly string _smtpPassword = "iovv rfzk nyqp wsuw";*/