using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DartTracker.Controllers
{
    public class OhOneController : Controller
    {
        // GET: OhOne
        public ActionResult Index()
        {
            return View();
        }

        // GET: OhOne/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: OhOne/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: OhOne/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: OhOne/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: OhOne/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: OhOne/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: OhOne/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
