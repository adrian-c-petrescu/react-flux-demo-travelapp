using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Hotels.Models
{
    public class HotelsDataQuery
    {
        public Pagination Pagination { get; set; }
        public IEnumerable<DataFilter> Filters { get; set; }
        public Sort Sort { get; set; }
    }

    public class Pagination
    {
        public int Start { get; set; }
        public int Count { get; set; }
    }

    public class DataFilter
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public DataFilterType Type { get; set; }
        public string Value { get; set; }
    }

    public class Sort
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public DataFilterType Field { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Direction Direction { get; set; }
    }

    public enum DataFilterType
    {
        Name,
        Stars,
        UserRating,
        MinCost,
        Distance
    }

    public enum Direction
    {
        Asc,
        Desc
    }
}