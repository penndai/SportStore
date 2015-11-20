using Microsoft.Owin;
using Owin;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security.Cookies;
using SportStore.Infrastructure.Identity;
using System;
using Microsoft.Owin.Security.OAuth;

[assembly: OwinStartup(typeof(SportStore.IdentityConfig))]

namespace SportStore
{
  
    public class IdentityConfig
    {
        public void Configuration(IAppBuilder app)
        {
            app.CreatePerOwinContext<StoreIdentityDbContext>(StoreIdentityDbContext.Create);
            app.CreatePerOwinContext<StoreUserManager>(StoreUserManager.Create);
            app.CreatePerOwinContext<StoreRoleManager>(StoreRoleManager.Create);
            //app.UseCookieAuthentication(new CookieAuthenticationOptions
            //{
            //    AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie
            //});

            //Using ASP.NET Identity in a web service requires some configuration statements in the IdentityConfig.cs file
            app.UseOAuthBearerTokens(new OAuthAuthorizationServerOptions
            {
                Provider = new StoreAuthProvider(),
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/Authenticate")
            });
        }
    }
}