using KendoUI_MVC.Models;
using Microsoft.AspNetCore.Mvc;
using QuickMailer;

namespace KendoUI_MVC.Controllers
{
   public class EmailController : Controller
   {
      public ActionResult Send()
      {
         return View();
      }
      [HttpPost]
      public ActionResult Send(MailMessage mailMessage)
      {
         try
         {
            List<string> toMailAddresses = new List<string>();
            List<string> ccMailAddresses = new List<string>();
            List<string> BccMailAddresses = new List<string>();
            Email email = new Email();
            toMailAddresses = GetValidMail(mailMessage.To);
            ccMailAddresses = GetValidMail(mailMessage.Cc);
            BccMailAddresses = GetValidMail(mailMessage.Bcc);
            string mgs = "Email send failed";


            bool isSend = email.SendEmail(toMailAddresses, Credential.Email,
               Credential.Password, mailMessage.Subject,
               mailMessage.Body, ccMailAddresses, BccMailAddresses);
            if (isSend)
            {
               mgs = "Email has been send .";
               ClearAll();
            }
            ViewBag.Mgs = mgs;
            return View();
         }
         catch (Exception ex)
         {
            Console.WriteLine(ex);
            throw;
         }
      }
      public List<string> GetValidMail(List<string> mails)
      {
         List<string> validMails = new List<string>();
         Email email = new Email();
         if (mails == null)
         {
            return validMails;
         }
         if (mails.Any())
         {
            foreach (var mail in mails)
            {
               bool isValid = email.IsValidEmail(mail);
               if (isValid)
               {
                  validMails.Add(mail);
               }

            }

         }
         return validMails;
      }
      public void ClearAll()
      {
         MailMessage mailMessage = new MailMessage();
         mailMessage.To = null;
         mailMessage.Cc = null;
         mailMessage.Bcc = null;
         mailMessage.Subject = null;
         mailMessage.Body = null;
      }
   }
}
