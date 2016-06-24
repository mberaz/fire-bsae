using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FireBaseTest.Controllers
{
    public class HomeController :Controller
    {
        public ActionResult Index ()
        {
            return View();
        }

        public ActionResult Chat ()
        {
            return View();
        }

        public ActionResult Log (string text,string date,string from)
        {
            Random r = new Random();
            return Json(new { Status = true,Id = r.Next(1,10) });
        }
    }
}