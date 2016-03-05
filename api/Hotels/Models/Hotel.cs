using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hotels.Models
{
    public class Hotel
    {
        public decimal Distance { get; set; }
        public int EstablishmentId { get; set; }
        public string EstablishmentType { get; set; }
        public string Location { get; set; }
        public decimal MinCost { get; set; }
        public string Name { get; set; }
        public int Stars { get; set; }
        public decimal UserRating { get; set; }
        public string UserRatingTitle { get; set; }
        public int UserRatingCount { get; set; }
        public string ImageUrl { get; set; }
        public string ThumbnailUrl { get; set; }
    }
}