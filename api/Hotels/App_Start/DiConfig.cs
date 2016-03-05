using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Hotels.Code.Logic;
using Hotels.Code.Persistence;

namespace Hotels.App_Start
{
    public class DiConfig
    {
        public static void Configure(HttpConfiguration config)
        {
            var builder = new ContainerBuilder();

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            builder.RegisterType<HotelQueryLogic>().As<IHotelQueryLogic>().InstancePerRequest();
            builder.RegisterType<HotelsDataSource>().As<IHotelsDataSource>().SingleInstance();
            
            var container = builder.Build();
            config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}
