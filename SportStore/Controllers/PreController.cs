using System.Threading.Tasks;
using System.Web.Mvc;
using SportStore.Models;

namespace SportStore.Controllers
{
    public class PreController : Controller
    {
        IRepository repo;

        public PreController()
        {
            repo = new ProductRepository();
        }

        // GET: Pre
        public ActionResult Index()
        {
            return View(repo.Products);
        }

        public async Task<ActionResult> DeleteProduct(int id)
        {
            await repo.DeleteProductAsync(id);
            return RedirectToAction("Index");
        }
        public async Task<ActionResult> SaveProduct(Product product)
        {
            await repo.SaveProductAsync(product);
            return RedirectToAction("Index");
        }

        public ActionResult Orders()
        {
            return View(repo.Orders);
        }
        public async Task<ActionResult> DeleteOrder(int id)
        {
            await repo.DeleteOrderAsync(id);
            return RedirectToAction("Orders");
        }
        public async Task<ActionResult> SaveOrder(Order order)
        {
            await repo.SaveOrderAsync(order);
            return RedirectToAction("Orders");
        }
    }
}