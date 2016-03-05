using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Cors;
using Hotels.Code.Logic;
using Hotels.Models;

namespace Hotels.Controllers
{
    [AllowAnonymous]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class HotelsDataController : ApiController
    {
        private readonly IHotelQueryLogic _hotelQueryLogic;

        public HotelsDataController(IHotelQueryLogic hotelQueryLogic)
        {
            _hotelQueryLogic = hotelQueryLogic;
        }

        [HttpPost]
        [ActionName("query")]
        public HttpResponseMessage RetrieveHotels(HotelsDataQuery dataQuery)
        {
            return Request.CreateResponse(HttpStatusCode.OK, _hotelQueryLogic.ReturnFilteredHotels(dataQuery));
        }
    }
}
