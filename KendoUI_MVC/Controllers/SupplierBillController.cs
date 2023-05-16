using Microsoft.AspNetCore.Mvc;

namespace KendoUI_MVC.Controllers
{
    public class SupplierBillController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult UserForm()
        {
           return View();
        }
        public IActionResult GeneralSupplierBill()
        {
            return View();
        }
    }
}
