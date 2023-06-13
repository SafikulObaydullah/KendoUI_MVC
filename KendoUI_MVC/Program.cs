using KendoUI_MVC.ApplicationDB;
using KendoUI_MVC.Interface;
using KendoUI_MVC.Models;
using KendoUI_MVC.Services;
using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);
//var settings = builder.Configuration.GetSection("MailSettings").Get<MailSettings>();
builder.Services.Configure<MailSettings>(builder.Configuration.GetSection("MailSettings"));
// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddTransient<IMailService, MailService>();
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
   options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Kendo}/{action=NotifyConsignee}/{id?}");

app.Run();
