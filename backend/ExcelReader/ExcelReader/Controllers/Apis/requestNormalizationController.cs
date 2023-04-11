using Business;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExcelReader.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class requestNormalizationController : ControllerBase
  {

    public RequestNormalizationViewModel requestModel = new RequestNormalizationViewModel()
    {
      header = new Header()
      {
        taxid = "A111220E1B9155CB1F18C7",
        indatim = "1665490063785",
        Indati2m = "1665490063785",
        inty = "1",
        inno = "0000011300",
        irtaxid = null,
        inp = "1",
        ins = "1",
        tins = "19117484910001",
        tob = "1",
        bid = "0",
        tinb = "19117484910002",
        sbc = "0",
        bpc = "0",
        bbc = "0",
        ft = "0",
        bpn = "0",
        scln = "0",
        scc = "0",
        crn = "0",
        billid = "0",
        tprdis = "2400000",
        tdis = "0",
        tadis = "2400000",
        tvam = "216000",
        todam = "0",
        tbill = "2616000",
        setm = "1",
        cap = "2616000",
        insp = "0",
        tvop = "216000",
        tax17 = "0"
      },
      body = new List<Body>()
      {
        new Body()
        {
        sstid= "1254219865985",
        sstt="روغن بهران",
        am= "1",
        mu= "لیتر",
        fee= "2400000",
        cfee= "0",
        cut= "0",
        exr= "0",
        prdis= "2400000",
        dis= "0",
        adis= "2400000",
        vra= "0.09",
        vam= "216000",
        odt= "0",
        odr= "0",
        odam= "0",
        olt= "0",
        olr= "0",
        olam= "0",
        consfee= "0",
        spro= "0",
        bros= "0",
        tcpbs= "0",
        cop= "0",
        vop= "216000",
        bsrn= null,
        tsstam= "2616000"

        }
      },
      payments = new List<Payment>()
      {
        new Payment()
        {
 iinn = "125036",
 acn = "252544",
 trmn = "2356566",
 trn = "252545",
 pcn = "6037991785693265",
 pid = "19117484910002",
 pdt = "1665490061447"

        }
      },
      extension = new List<Extension>()
      {
        new Extension()
        {
          key = null,
          value = null
        }
      }

    };
    private CryptoUtils _cryptoUtils;

    public requestNormalizationController(CryptoUtils cryptoUtils)
    {
      this._cryptoUtils=cryptoUtils;
    }

    private readonly ILogger<requestNormalizationController> _logger;

    public requestNormalizationController(ILogger<requestNormalizationController> logger)
    {
      _logger = logger;
    }

    //[HttpGet]
    //public IEnumerable<WeatherForecast> Get()
    //{

    //}
  }
}
