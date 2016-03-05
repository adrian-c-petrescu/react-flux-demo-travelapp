using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Hotels.Code.Persistence;
using Hotels.Models;
using Microsoft.Ajax.Utilities;
using WebGrease.Css.Extensions;

namespace Hotels.Code.Logic
{
    public interface IHotelQueryLogic
    {
        HotelsResponse ReturnFilteredHotels(HotelsDataQuery query);
    }

    public class HotelQueryLogic : IHotelQueryLogic
    {
        private readonly IHotelsDataSource _dataSource;
        public HotelQueryLogic(IHotelsDataSource dataSource)
        {
            _dataSource = dataSource;
        }

        public HotelsResponse ReturnFilteredHotels(HotelsDataQuery query)
        {
            var querySource = _dataSource.HotelsQueryableData();

            var filteredSource = query.Filters.Aggregate(querySource, (current, filter) => current.ApplyFilter(filter));
            var sortedList = filteredSource.ApplySort(query.Sort);
            var pagedList = sortedList.ApplyPagination(query.Pagination);

            return new HotelsResponse
            {
                AvailableCount = filteredSource.Count(),
                Data = pagedList.ToArray()
            };
        }

        
    }
}