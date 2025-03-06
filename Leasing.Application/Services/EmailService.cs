using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;
using Leasing.Application.Interfaces;
using Microsoft.Extensions.Configuration;
namespace Leasing.Application.Services;


public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task Send(string to, string subject, string body, bool isHtml, SenderInfo senderInfo)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(senderInfo.Name, senderInfo.Email));
        message.To.Add(new MailboxAddress("", to));
        message.Subject = subject;

        var bodyBuilder = new BodyBuilder();
        if (isHtml) bodyBuilder.HtmlBody = body;
        else bodyBuilder.TextBody = body;
        message.Body = bodyBuilder.ToMessageBody();

        using var client = new SmtpClient();
        await client.ConnectAsync(_configuration["Email:SmtpHost"], int.Parse(_configuration["Email:SmtpPort"]), false);
        await client.AuthenticateAsync(_configuration["Email:SmtpUser"], _configuration["Email:SmtpPass"]);
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}
