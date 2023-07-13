namespace KendoUI_MVC.Models
{
   public class ItemInfo
   {
      public Item items { get; set; }  
      public decimal Qnty { get; set; }   
      public decimal Rate { get; set; }
      public decimal Amount { get; set; }
   }
   public class Item
   {
      public int ItemId { get; set; }
      public string ItemName { get; set; }

   }
}
