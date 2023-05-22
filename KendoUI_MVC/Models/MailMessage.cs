namespace KendoUI_MVC.Models
{
   public class MailMessage
   {
      public List<string> To { get; set; }
      public List<string> Cc { get; set; }
      public List<string> Bcc { get; set; }
      public string Subject { get; set; }
      public string Body { get; set; }
   }
}
