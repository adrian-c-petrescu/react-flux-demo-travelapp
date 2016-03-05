using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;
using Hotels.Models;
using Newtonsoft.Json;

namespace Hotels.Code.Persistence
{
    public interface IHotelsDataSource
    {
        IQueryable<Hotel> HotelsQueryableData();
    }

    public class HotelsDataSource : IHotelsDataSource
    {
        private readonly StorageModel _storageData;

        public HotelsDataSource()
        {
            var data = File.ReadAllText(HttpContext.Current.Server.MapPath(@"~/App_Data/hotels.json"));
            _storageData = JsonConvert.DeserializeObject<StorageModel>(data);
        }

        public IQueryable<Hotel> HotelsQueryableData()
        {
            return _storageData.Establishments.AsQueryable();
        }
    }
}