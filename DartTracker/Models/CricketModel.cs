using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DartTracker.Models
{
    public class CricketModel
    {
        public string ID { get; set; }
        public string DATE { get; set; }
        public string WINNER { get; set; }
        public string LOSER { get; set; }
        public string SPREAD { get; set; }
    }
}