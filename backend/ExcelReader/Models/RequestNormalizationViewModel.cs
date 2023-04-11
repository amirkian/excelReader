using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
  public class RequestNormalizationViewModel
  {
   public Header header { get; set; }
   public List<Body> body { get; set; }
   public List<Payment> payments { get; set; }
   public List<Extension> extension { get; set; }

  }
}
