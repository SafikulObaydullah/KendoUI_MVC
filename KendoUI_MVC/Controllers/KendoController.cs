using KendoUI_MVC.ApplicationDB;
using KendoUI_MVC.Models;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Newtonsoft.Json.Linq;
using System.Data;
using System.Security.Cryptography;
 

namespace KendoUI_MVC.Controllers
{
   public class KendoController : Controller
   {
      private readonly ApplicationDbContext _context;
      public KendoController(ApplicationDbContext context) 
      {
         this._context = context;
      }
      public ActionResult Index()
      {
         
         return View();
      }
      public ActionResult SaveData(NotifyConsignee obj)
      {
         try
         {
            string connectionString = "Data Source=DESKTOP-HJ8UUA1\\SQLEXPRESS01;Initial Catalog=KendoUIDB;Trusted_Connection=True";

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
               connection.Open();

               using (SqlCommand command = new SqlCommand())
               {
                  command.Connection = connection;
                  command.CommandType = CommandType.StoredProcedure;
                  command.CommandText = "InsertUpdateNotifyConsignee ";

                  //Add Parameters if needed
                  command.Parameters.AddWithValue("@Id", obj.Id);
                  command.Parameters.AddWithValue("@Buyer", obj.Buyer);
                  command.Parameters.AddWithValue("@Name", obj.Name);
                  command.Parameters.AddWithValue("@Type", obj.Type);
                  command.Parameters.AddWithValue("@Address", obj.Address);
                  command.Parameters.AddWithValue("@Description", obj.Description);
                  // Add more parameters as required

                  // Execute the stored procedure
                  command.ExecuteNonQuery();

                  return Json(new { success = true, message = "Stored procedure executed successfully." });
               }
            }
         }
         catch (Exception ex)
         {
            return Json(new { success = false, message = ex.Message });
         }
      }
      //public ActionResult NotifyConsignee(NotifyConsignee obj)
      //{
      //   try
      //   {
      //      string con = "Data Source=DESKTOP-HJ8UUA1\\SQLEXPRESS01;Initial Catalog=KendoUIDB;Trusted_Connection=True;";
      //      using (SqlConnection sqlConnection = new SqlConnection(con))
      //      {
      //         sqlConnection.Open();
      //         using (SqlCommand command = new SqlCommand())
      //         {
      //            command.Connection = sqlConnection;
      //            command.CommandType = CommandType.StoredProcedure;
      //            command.CommandText = "InsertUpdateNotifyConsignee ";

      //            //Add Parameters if needed
      //            command.Parameters.AddWithValue("@Id", obj.Id);
      //            command.Parameters.AddWithValue("@Buyer", obj.Buyer);
      //            command.Parameters.AddWithValue("@Name", obj.Name);
      //            command.Parameters.AddWithValue("@Type", obj.Type);
      //            command.Parameters.AddWithValue("@Address", obj.Address);
      //            command.Parameters.AddWithValue("@Description", obj.Description);

      //            command.ExecuteNonQuery();
      //            return Json(new { success = true, message = "Stored procedure executed successfully." });
      //         }
      //      }
      //   }
      //   catch (Exception ex)
      //   {
      //      return JsonResult(new { success = false, message = ex.Message });
      //   }
      //}
      public ActionResult NotifyConsignee()
      { 
         return View(); 
      }
      public ActionResult ItemInfo()
      {
         return View(); 
      }
      public IActionResult SaveItemInfo(List<ItemInfo> objItemList)
      {
         return Json("Success", System.Web.Mvc.JsonRequestBehavior.AllowGet);
      }
   }
}
