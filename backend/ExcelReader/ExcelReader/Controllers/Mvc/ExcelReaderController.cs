using Microsoft.AspNetCore.Mvc;

namespace ExcelReader.Controllers.Mvc
{
  public class ExcelReaderController : Controller
  {
    public IActionResult Index()
    {
      return View();
    }
  }
}
