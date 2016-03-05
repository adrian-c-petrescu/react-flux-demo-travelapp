using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hotels.Models
{
    public class HotelsResponse
    {
        public IEnumerable<Hotel> Data { get; set; }
        public int AvailableCount { get; set; }
    }


}