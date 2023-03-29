export class payment {
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
    iinn: number,
    acn: number,
    trmn: number,
    pmt: number,
    trn: number,
    pcn: number,
    pid: number,
    pdt: number,
    pv: number


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
