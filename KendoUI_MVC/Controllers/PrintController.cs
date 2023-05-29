using Microsoft.AspNetCore.Mvc;

namespace KendoUI_MVC.Controllers
{
   public class PrintController : Controller
   {
      public IActionResult Print()
      {
         return View();
      }
   }
}
