using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SmartPowerCilent.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Notification()
        {
            ViewBag.Message = "Your notification page.";

            return View();
        }
        public ActionResult HomePage()
        {
            ViewBag.Message = "Your homepage page.";

            return View();
        }
        public ActionResult Users()
        {
            ViewBag.Message = "Your User page.";

            return View();
        }

        public ActionResult newUser()
        {
            ViewBag.Message = "New User page.";

            return View();

        }
    }
}