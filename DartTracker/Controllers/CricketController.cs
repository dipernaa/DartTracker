using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DartTracker.Controllers
{
    public class CricketController : Controller
    {
        // GET: Cricket
        public ActionResult Index()
        {
            return View();
        }

        // GET: Cricket/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Cricket/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Cricket/Create
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

        // GET: Cricket/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Cricket/Edit/5
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

        // GET: Cricket/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Cricket/Delete/5
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
