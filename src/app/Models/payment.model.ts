export class Payment {
  iinn: number;
  acn: number;
  trmn: number;
  pmt: number;
  trn: number;
  pcn: number;
  pid: number;
  pdt: number;
  pv: number;

  constructor(
    iinn: number=0,
    acn: number=0,
    trmn: number=0,
    pmt: number=0,
    trn: number=0,
    pcn: number=0,
    pid: number=0,
    pdt: number=0,
    pv: number=0


  ) {
    this.iinn = iinn;
    this.acn = acn;
    this.trmn = trmn;
    this.pmt = pmt;
    this.trn = trn;
    this.pcn = pcn;
    this.pid = pid;
    this.pdt = pdt;
    this.pv = pv;
 }
}
