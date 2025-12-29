using Microsoft.AspNetCore.Mvc;

namespace BrokerApp.Controllers
{

    public class SocialTradingController : Controller
    {
        private readonly ILogger<SocialTradingController> _logger;

        public SocialTradingController(ILogger<SocialTradingController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Accounts()
        {
            return View();
        }

        public IActionResult AccountDetail()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }
    }
}