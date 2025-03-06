using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Leasing.Application.Interfaces
{
    public class SenderInfo
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }

    public interface IEmailService
    {
        Task Send(string to, string subject, string body, bool isHtml, SenderInfo senderInfo);
    }
}
