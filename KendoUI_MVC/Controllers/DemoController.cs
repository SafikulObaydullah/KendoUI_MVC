using Microsoft.AspNetCore.Mvc;

namespace KendoUI_MVC.Controllers
{
    public class DemoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
