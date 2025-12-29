using Microsoft.AspNetCore.Mvc;

namespace BrokerApp.Controllers
{

    public class PaymentController : Controller
    {
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(ILogger<PaymentController> logger)
        {
            _logger = logger;
        }

        public IActionResult Deposit()
        {
            return View();
        }

        public IActionResult Deposit_Payment()
        {
            return View();
        }
        public IActionResult Deposit_Confirmation()
        {
            return View();
        }
        public IActionResult Deposit_InProgress()
        {
            return View();
        }
        public IActionResult Deposit_Details()
        {
            return View();
        }

        public IActionResult Transaction_History()
        {
            return View();
        }

        public IActionResult Withdrawal()
        {
            return View();
        }

        public IActionResult Withdrawal_Details()
        {
            return View();
        }

        public IActionResult Withdrawal_Confirmation()
        {
            return View();
        }

        public IActionResult Withdrawal_InProgress()
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