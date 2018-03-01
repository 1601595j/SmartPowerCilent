using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;

namespace SmartPowerCilent.Controllers
{
    public class HomeController : Controller
    {

        HttpClient client = new HttpClient();
        string activityUrl = "api/Activity";
        string presenceUrl = "api/Presence";

        // constructor for controller
        // By: Chang Kai Wen
        public HomeController()
        {
            client.BaseAddress = new Uri("http://localhost:60854/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }


        public ActionResult Status()
        {
            try
            {
                if (CheckActivity() && !CheckPresence())
                {
                    ViewBag.Message = "alert-danger";
                }
                else
                {
                    ViewBag.Message = "alert-success";
                }

            }
            catch (HttpException e)
            {
                return View("Error", new HandleErrorInfo(e, "Home", "Status"));
            }

            return View();
        }

        // checks if there is activity in the room
        // By: Chang Kai Wen
        public bool CheckActivity()
        {
            try
            {
                HttpResponseMessage response = client.GetAsync(activityUrl).Result;
                if (response.IsSuccessStatusCode)
                {
                    var data = response.Content.ReadAsStringAsync();
                    if (data.Result == "true")
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    throw new HttpException("Cannot get response from Activity API");
                }
            }
            catch (Exception e)
            {
                throw new HttpException("CheckActivity:" + e.Message);
            }
        }

        // checks presence of authorized person in the room
        // By: Chang Kai Wen
        public bool CheckPresence()
        {
            try
            {
                HttpResponseMessage response = client.GetAsync(presenceUrl).Result;
                if (response.IsSuccessStatusCode)
                {
                    var data = response.Content.ReadAsStringAsync();
                    if (data.Result == "true")
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    throw new HttpException("Cannot get response from Presence API");
                }
            }
            catch (Exception e)
            {
                Debug.WriteLine(">>" + e.StackTrace);
                throw new HttpException("CheckPresence::" + e.Message);
            }

        }

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