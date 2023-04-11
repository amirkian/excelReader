using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaxCollectData.Library.Business;
using TaxCollectData.Library.Dto.Config;
using TaxCollectData.Library.Dto.Content;
using TaxCollectData.Library.Dto.Properties;
using TaxCollectData.Library.Enums;

namespace Business
{
  public static class TaxService
  {
    public static void Call()
    {
      try
      {
        StringBuilder sb = new StringBuilder();
          using (StreamReader sr = new StreamReader(@"F:\Development\excelreader\mine\excelReader\backend\TaxCollectData\TaxCollectData\Business\Files\private_key_10103657850.pem"))

        {
          String line;
          // Read and display lines from the file until the end of 
          // the file is reached.
          while ((line = sr.ReadLine()) != null)
          {
            sb.AppendLine(line);
          }
        }
        string s_pemFilePath = sb.ToString();

        //        TaxApiService.Instance.Init(ConfigurationManager.AppSettings["CLIENT_ID"],
        //new SignatoryConfig(ConfigurationManager.AppSettings["privateKey"], null),
        //new NormalProperties(ClientType.SELF_TSP));
        //        TaxApiService.Instance.TaxApis.GetServerInformation();
        //        TaxApiService.Instance.TaxApis.RequestToken();
        //        InvoiceDto invoiceDto = new InvoiceDto();
        //        var invoices = new List<InvoiceDto>
        //{
        // invoiceDto
        //};
        //        TaxApiService.Instance.TaxApis.SendInvoices(invoices, null);


        TaxApiService.Instance.Init(ConfigurationManager.AppSettings["CLIENT_ID"],
       new Pkcs8SignatoryConfig(s_pemFilePath, null),
        new NormalProperties(ClientType.SELF_TSP));
        TaxApiService.Instance.TaxApis.GetServerInformation();
        TaxApiService.Instance.TaxApis.RequestToken();
        InvoiceDto invoiceDto = new InvoiceDto();
        var invoices = new List<InvoiceDto>
         {
          invoiceDto
         };
        TaxApiService.Instance.TaxApis.SendInvoices(invoices, null);



      }
      catch (Exception ex)
      {

        throw ;
      }
    }
  }//end class
}//end namespace
