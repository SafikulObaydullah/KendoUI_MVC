using KendoUI_MVC.Models;
using Microsoft.EntityFrameworkCore;

namespace KendoUI_MVC.ApplicationDB
{
   public class ApplicationDbContext : DbContext
   {
      public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
      {

      }
      public DbSet<NotifyConsignee> NotifyConsignee { get; set; }
   }
}
