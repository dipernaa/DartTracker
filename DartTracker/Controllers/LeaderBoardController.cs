using DartTracker.Models;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DartTracker.Controllers
{
    public class LeaderBoardController : Controller
    {
        // GET: LeaderBoard
        public ActionResult Index()
        {
            JObject jsonObj = new JObject();
            AmazonHandler amazonHandler = new AmazonHandler();

            var responseQuery = amazonHandler.queryTable("DartTrackerLeaderboard", "Cricket");
            jsonObj["SCORES"] = amazonHandler.makeJArray(responseQuery.Items);

            ViewBag.SCORES = jsonObj.ToString();

            return View();
        }

        // GET: LeaderBoard/Details/5
        public string Details(string id)
        {
            JObject jsonObj = new JObject();
            AmazonHandler amazonHandler = new AmazonHandler();

            var responseQuery = amazonHandler.queryTable("DartTrackerLeaderboard", id);
            jsonObj["SCORES"] = amazonHandler.makeJArray(responseQuery.Items);

            return jsonObj.ToString();
        }

        // GET: LeaderBoard/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: LeaderBoard/Create
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

        // GET: LeaderBoard/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: LeaderBoard/Edit/5
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

        // GET: LeaderBoard/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: LeaderBoard/Delete/5
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
