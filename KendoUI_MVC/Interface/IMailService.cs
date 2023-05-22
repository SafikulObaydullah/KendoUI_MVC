using KendoUI_MVC.Models;

namespace KendoUI_MVC.Interface
{
   public interface IMailService
   {
      Task SendEmailAsync(MailRequest mailRequest);
      Task SendWelcomeEmailAsync(WelcomeRequest request);
   }
}
