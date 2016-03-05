using System;
using System.Linq;
using Hotels.Code.Logic;
using Hotels.Models;
using NUnit.Framework;

namespace Hotels.UnitTests.Code.Logic
{
    [TestFixture]
    public class FilterBuilderTests
    {
        private IQueryable<Hotel> _data;

        [TestFixtureSetUp]
        public void SetUp()
        {
            _data = GetHotels();
        }

        [Test]
        public void ApplyFilter_NameFilter_ReturnsFilteredData()
        {
            var filter = new DataFilter
            {
                Type = DataFilterType.Name,
                Value = "bc"
            };

            var filteredData = _data.ApplyFilter(filter);

            Assert.AreEqual(2, filteredData.Count());
            Assert.IsTrue(filteredData.Select(fd => fd.Name).Contains("abc"));
            Assert.IsTrue(filteredData.Select(fd => fd.Name).Contains("bcd"));
        }

        [Test]
        public void ApplyFilter_StarsFilter_ReturnsFiltedData()
        {
            var filter = new DataFilter
            {
                Type = DataFilterType.Stars,
                Value = "3"
            };
            var filteredData = _data.ApplyFilter(filter);
            Assert.AreEqual(1, filteredData.Count());
            Assert.AreEqual(filteredData.First().Name, "efg");
        }

        [Test]
        public void ApplyFilter_UserRatingFilter_ReturnsFilteredData()
        {
            var filter = new DataFilter
            {
                Type = DataFilterType.UserRating,
                Value = "3-4"
            };
            var filteredData = _data.ApplyFilter(filter);
            Assert.AreEqual(1, filteredData.Count());
            Assert.AreEqual(filteredData.First().Name, "efg");
        }

        [Test]
        public void ApplyFilter_MinCostFilter_ReturnsFilteredData()
        {
            var filter = new DataFilter
            {
                Type = DataFilterType.MinCost,
                Value = "250"
            };
            var filteredData = _data.ApplyFilter(filter);
            Assert.AreEqual(2, filteredData.Count());
            Assert.IsTrue(filteredData.Select(fd => fd.Name).Contains("abc"));
            Assert.IsTrue(filteredData.Select(fd => fd.Name).Contains("bcd"));
        }

        [Test]
        public void ApplyFilter_UnsupportedFilter_ThrowsException()
        {
            var filter = new DataFilter
            {
                Type = DataFilterType.Distance,
            };
            Assert.Throws<InvalidOperationException>(() => _data.ApplyFilter(filter));
        }


        private IQueryable<Hotel> GetHotels()
        {
            return new[]
            {
                new Hotel {Name = "abc", Stars = 1, UserRating = 1.2m, MinCost = 100m},
                new Hotel {Name = "bcd", Stars = 2, UserRating = 2.3m, MinCost = 200m},
                new Hotel {Name = "efg", Stars = 3, UserRating = 3.4m, MinCost = 300m},
                new Hotel {Name = "ghe", Stars = 4, UserRating = 4.5m, MinCost = 400m},
            }.AsQueryable();
        }
    }
}
