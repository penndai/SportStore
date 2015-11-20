using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace SportStore.Infrastructure.Identity
{
    public class StoreIdentityDbContext:IdentityDbContext<StoreUser>
    {
        public StoreIdentityDbContext() : base("SportStoreIdentityDb")
        {
            Database.SetInitializer<StoreIdentityDbContext>(new
            StoreIdentityDbInitializer());
        }
        public static StoreIdentityDbContext Create()
        {
            return new StoreIdentityDbContext();
        }
    }
}