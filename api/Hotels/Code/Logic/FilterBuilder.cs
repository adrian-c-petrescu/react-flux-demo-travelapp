using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Hotels.Models;

namespace Hotels.Code.Logic
{
    public static class FilterBuilder
    {
        public static IQueryable<Hotel> ApplyFilter(this IQueryable<Hotel> querySource, DataFilter dataFilter)
        {
            if (dataFilter.Type == DataFilterType.Name)
            {
                var val = dataFilter.Value.ToLower();
                return querySource.Where(h => h.Name.ToLower().Contains(val));
            }
            else if (dataFilter.Type == DataFilterType.Stars)
            {
                var stars = int.Parse(dataFilter.Value);
                return querySource.Where(h => h.Stars == stars);
            }
            else if (dataFilter.Type == DataFilterType.UserRating)
            {
                var ratingLimits = dataFilter.Value.Split('-').Select(limStr => decimal.Parse(limStr)).ToArray();
                if (ratingLimits.Count() != 2 || ratingLimits[0] >= ratingLimits[1])
                    throw new InvalidOperationException("Limit formats is 4-5");
                return querySource.Where(h => h.UserRating >= ratingLimits[0] && h.UserRating < ratingLimits[1]);
            }
            else if (dataFilter.Type == DataFilterType.MinCost)
            {
                var minCost = decimal.Parse(dataFilter.Value);
                return querySource.Where(h => h.MinCost <= minCost);
            }
            else
            {
                throw new InvalidOperationException("Filter not recognized " + dataFilter.Type);
            }
        }

        public static IQueryable<Hotel> ApplySort(this IQueryable<Hotel> querySource, Sort sort)
        {
            if (sort == null)
            {
                return querySource;
            }


            if (sort.Field == DataFilterType.Distance)
            {
                if (sort.Direction == Direction.Asc) return querySource.OrderBy(h => h.Distance);
                else return querySource.OrderByDescending(h => h.Distance);
            }
            else if (sort.Field == DataFilterType.Stars)
            {
                if (sort.Direction == Direction.Asc) return querySource.OrderBy(h => h.Stars);
                else return querySource.OrderByDescending(h => h.Stars);
            }
            else if (sort.Field == DataFilterType.MinCost)
            {
                if (sort.Direction == Direction.Asc) return querySource.OrderBy(h => h.MinCost);
                else return querySource.OrderByDescending(h => h.MinCost);
            }
            else if (sort.Field == DataFilterType.UserRating)
            {
                if (sort.Direction == Direction.Asc) return querySource.OrderBy(h => h.UserRating);
                else return querySource.OrderByDescending(h => h.UserRating);
            }
            else
            {
                throw new InvalidOperationException(string.Format("Sorting by {0} is not supported", sort.Field));
            }
        }

        public static IQueryable<Hotel> ApplyPagination(this IQueryable<Hotel> querySource, Pagination pagination)
        {
            return querySource.Skip(pagination.Start).Take(pagination.Count);
        }
    }
}