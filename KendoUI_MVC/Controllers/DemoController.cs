using Microsoft.AspNetCore.Mvc;

namespace KendoUI_MVC.Controllers
{
    public class DemoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult SupplierInfo()
        {
            return View();
        }
		public IActionResult CreateSupplier()
		{
			return View();
		}
      public IActionResult GridWrapper()
      {
         return View();
      }
      public IActionResult Toastr()
      {
         return View();
      }
      public IActionResult CreatePanel()
      {
         return View();
      }
   }
}
