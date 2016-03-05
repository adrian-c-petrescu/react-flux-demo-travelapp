using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Hotels.Models;

namespace Hotels.Code.Persistence
{
    public class StorageModel
    {
        public Guid AvailabilitySearchId { get; set; }
        public IEnumerable<Hotel> Establishments { get; set; }
    }
}