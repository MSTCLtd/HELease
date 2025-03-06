using Leasing.Application.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Application.Services
{
    public class SmsService : ISmsService
    {
        private readonly IConfiguration _configuration;

        public SmsService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendAsync(string to, string message)
        {
            //TwilioClient.Init(_configuration["Twilio:AccountSid"], _configuration["Twilio:AuthToken"]);
            //await MessageResource.CreateAsync(
            //    body: message,
            //    from: new Twilio.Types.PhoneNumber(_configuration["Twilio:FromNumber"]),
            //    to: new Twilio.Types.PhoneNumber(to)
            //);
        }
    }
}
