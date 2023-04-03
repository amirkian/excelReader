export class Body {
  sstid: string;
  sstt: string;
  am: number;
  mu: number;
  nw: number;
  fee: number;
  cfee: number;
  cut: string;
  exr: number;
  ssrv: number;
  sscv: number;
  prdis: number;
  dis: number;
  adis: number;
  vra: number;
  vam: number;
  odt: string;
  odr: number;
  odam: number;
  olt: string;
  olr: number;
  consfee: number;
  spro: number;
  bros: number;
  tcpbs: number;
  cop: number;
  vop: number;
  bsrn: string;
  tsstam: number;


  constructor(
    sstid: string='',
    sstt: string='',
    am: number=0,
    mu: number=0,
    nw: number=0,
    fee: number=0,
    cfee: number=0,
    cut: string='',
    exr: number=0,
    ssrv: number=0,
    sscv: number=0,
    prdis: number=0,
    dis: number=0,
    adis: number=0,
    vra: number=0,
    vam: number=0,
    odt: string='',
    odr: number=0,
    odam: number=0,
    olt: string='',
    olr: number=0,
    consfee: number=0,
    spro: number=0,
    bros: number=0,
    tcpbs: number=0,
    cop: number=0,
    vop: number=0,
    bsrn: string='',
    tsstam: number=0
  ) {
    this.sstid = sstid;
    this.sstt = sstt;
    this.am = am;
    this.mu = mu;
    this.nw = nw;
    this.fee = fee;
    this.cfee = cfee;
    this.cut = cut;
    this.exr = exr;
    this.ssrv = ssrv;
    this.sscv = sscv;
    this.prdis = prdis;
    this.dis = dis;
    this.adis = adis;
    this.vra = vra;
    this.vam = vam;
    this.odt = odt;
    this.odr = odr;
    this.odam = odam;
    this.olt = olt;
    this.olr = olr;
    this.consfee = consfee;
    this.spro = spro;
    this.bros = bros;
    this.tcpbs = tcpbs;
    this.cop = cop;
    this.vop = vop;
    this.bsrn = bsrn;
    this.tsstam = tsstam;
 }
}
