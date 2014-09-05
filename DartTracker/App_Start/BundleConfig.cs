using System.Web;
using System.Web.Optimization;

namespace DartTracker
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/DataTables-1.10.0/jquery.dataTables.js",
                        "~/Scripts/DataTables-1.10.0/dataTables.bootstrap.js",
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                        "~/Scripts/knockout-3.2.0.js"));

            bundles.Add(new ScriptBundle("~/bundles/home").Include(
                        "~/Scripts/ViewScripts/home.js"));

            bundles.Add(new ScriptBundle("~/bundles/ohOne").Include(
                        "~/Scripts/ViewScripts/ohOne.js"));

            bundles.Add(new ScriptBundle("~/bundles/cricket").Include(
                        "~/Scripts/ViewScripts/cricket.js"));

            bundles.Add(new ScriptBundle("~/bundles/ticTacToe").Include(
                        "~/Scripts/ViewScripts/ticTacToe.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/DataTables-1.10.0/css/dataTables.bootstrap.css",
                      "~/Content/DataTables-1.10.0/css/jquery.dataTables.css",
                      "~/Content/site.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
