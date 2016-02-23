using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FireBaseTest.Startup))]
namespace FireBaseTest
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
