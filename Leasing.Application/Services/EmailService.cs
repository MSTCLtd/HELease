using Leasing.Application.Interfaces;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task Send(string to, string subject, string body, bool isHtml, SenderInfo senderInfo)
    {
        try
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(senderInfo.Name, _configuration["Email:Email"]));
            email.To.Add(new MailboxAddress("", to));
            email.Subject = subject;
            email.Body = new TextPart(isHtml ? "html" : "plain") { Text = $"Dear {senderInfo.Name},<br /><br />{body}.<br/><br/>Regards,<br />MSTC LTD." };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_configuration["Email:SmtpHost"], int.Parse(_configuration["Email:SmtpPort"]), MailKit.Security.SecureSocketOptions.None);
            await smtp.AuthenticateAsync(_configuration["Email:Email"], _configuration["Email:Password"]);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);

            _logger.LogInformation("Email sent to {To} with subject {Subject}", to, subject);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send email to {To}: {Message}", to, ex.Message);
            throw;
        }
    }
}