import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
declare function callSelect2(): any;

@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.sass']
})
export class ExcelsheetComponent implements OnInit {
  data: [][] | undefined;
  orders = [
    { index:-1, value: 'none', key: 'هیچکدام' },
    //body********************************************************************************************************** */
    { index:0, value: 'sstid', key: 'شناسه کالا/خدمت' ,type:'string',minLength:13,maxLength:13,required:true},
    { index:1, value: 'sstt', key: 'شرح کالا/خدمت' ,type:'string',minLength:0,maxLength:400,required:false},
    { index:2, value: 'am', key: 'عداد/مقدار' ,type:'double',minLength:0,maxLength:13.99999999,required:true},
    { index:3, value: 'mu', key: 'واحد اندازهگیری' ,type:'string',minLength:0,maxLength:8,required:false},
    { index:4, value: 'nw', key: 'وزن خالص' ,type:'double',minLength:0,maxLength:16.999,required:false},
    { index:5, value: 'fee', key: 'مبلغ واحد' ,type:'double',minLength:0,maxLength:18.99999999,required:false},
    { index:6, value: 'cfee', key: 'میزان ارز' ,type:'double',minLength:0,maxLength:15.9999,required:false},
    { index:7, value: 'cut', key: 'نوع ارز' ,type:'string',minLength:3,maxLength:3,required:false},
    { index:8, value: 'exr', key: 'نرخ برابری ارز با ریال' ,type:'long',minLength:0,maxLength:18,required:false},
    { index:9, value: 'ssrv', key: 'ارزش ریالی کالا' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:10, value: 'sscv', key: 'ارزش ارزی کالا' ,type:'double',minLength:0,maxLength:15.9999,required:false},
    { index:11, value: 'prdis', key: 'مبلغ قبل از تخفیف' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:12, value: 'dis', key: 'مبلغ تخفیف' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:13, value: 'adis', key: 'مبلغ بعد از تخفیف' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:14, value: 'vra', key: 'نرخ مالیات بر ارزش افزوده' ,type:'double',minLength:0,maxLength:3.2,required:false},
    { index:15, value: 'vam', key: 'مبلغ مالیات بر ارزش افزوده' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:16, value: 'odt', key: 'موضوع سایر  مالیات وعوارض' ,type:'string',minLength:0,maxLength:255,required:false},
    { index:17, value: 'odr', key: 'نرخ سایر   مالیات و عوارض' ,type:'double',minLength:0,maxLength:3.2,required:false},
    { index:18, value: 'odam', key: 'مبلغ سایر  مالیات و عوارض' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:19, value: 'olt', key: 'موضوع سایر وجوه  قانونی' ,type:'string',minLength:0,maxLength:255,required:false},
    { index:20, value: 'olr', key: 'نرخ سایر وجوه  قانونی' ,type:'double',minLength:0,maxLength:3.2,required:false},
    { index:21, value: 'olam', key: 'مبلغ سایر  وجوه  قانونی' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:22, value: 'consfee', key: 'اجرت ساخت' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:23, value: 'spro', key: 'سود فروشنده' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:24, value: 'bros', key: 'حقالعمل' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:25, value: 'tcpbs', key: 'جمع کل اجرت، حقالعمل و سود' ,type:'',minLength:0,maxLength:18.0,required:false},
    { index:26, value: 'cop', key: 'سهم نقدی از پرداخت' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:27, value: 'vop', key: 'سهم مالیات بر ارزش افزوده از پرداخت' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:28, value: 'bsrn', key: 'شناسه یکتای ثبت قرارداد حقالعمل کاری' ,type:'string',minLength:12,maxLength:12,required:false},
    { index:29, value: 'tsstam', key: ' مبلغ کل کالا/خدمت' ,type:'double',minLength:0,maxLength:18.0,required:false},
    //header********************************************************************************************************** */
    { index:30, value: 'taxid', key: 'شماره منحصر به فرد مالیاتی' ,type:'string',minLength:22,maxLength:22,required:true},
    { index:31, value: 'indatim', key: '  تاریخ و زمان صدور صورتحساب )میالدی(' ,type:'double',minLength:0,maxLength:13.0,required:true},
    { index:32, value: 'Indati2m', key: ' تاریخ و زمان ایجاد صورتحساب )میالدی(' ,type:'double',minLength:0,maxLength:13.0,required:false},
    { index:33, value: 'inty', key: ' مبلغ کل کالا/خدمت' ,type:'int',minLength:1,maxLength:1,required:true},
    { index:34, value: 'inno', key: ' سریال صورتحساب داخلی حافظه مالیاتی' ,type:'string',minLength:10,maxLength:10,required:false},
    { index:35, value: 'irtaxid', key: ' شماره منحصر به فرد مالیاتی صورتحساب مرجع' ,type:'string',minLength:22,maxLength:22,required:false},
    { index:36, value: 'inp', key: ' الگوی صورتحساب' ,type:'int',minLength:0,maxLength:2,required:true},
    { index:37, value: 'ins', key: ' مبلغ کل کالا/خدمت' ,type:'int',minLength:1,maxLength:1,required:true},
    { index:38, value: 'tins', key: 'شماره اقتصادی فروشنده' ,type:'string',minLength:11,maxLength:14,required:true},
    { index:39, value: 'tob', key: 'نوع شخص خریدار' ,type:'int',minLength:1,maxLength:1,required:false},
    { index:40, value: 'bid', key: 'شناسه ملی/ شماره     ملی/    شناسه مشارکت     مدنی/ کد فراگیر     اتباع غیرایران    خریداشناسه ملی/ شماره  ملی/  شناسه مشارکت     مدنی/ کد فراگیر     اتباع غیرایرانی    خریدارر' ,type:'int',minLength:10,maxLength:12,required:false},    { index:29, value: 'tsstam', key: ' مبلغ کل کالا/خدمت' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:41, value: 'tinb', key: 'شماره اقتصادی خریدار' ,type:'string',minLength:11,maxLength:14,required:false},
    { index:42, value: 'sbc', key: 'کد شعبه فروشنده' ,type:'string',minLength:0,maxLength:10,required:false},
    { index:43, value: 'bpc', key: 'کد پستی خریدار' ,type:'string',minLength:10,maxLength:10,required:false},
    { index:44, value: 'bbc', key: 'کد شعبه خریدار' ,type:'string',minLength:10,maxLength:10,required:false},
    { index:45, value: 'ft', key: 'نوع پرواز' ,type:'int',minLength:1,maxLength:1,required:false},
    { index:46, value: 'bpn', key: 'شماره گذرنامه خریدار' ,type:'string',minLength:9,maxLength:9,required:false},
    { index:47, value: 'scln', key: 'شماره پروانه  گمرکی' ,type:'string',minLength:0,maxLength:14,required:false},
    { index:48, value: 'scc', key: 'کد گمرک محل  اظهار فروشنده' ,type:'string',minLength:0,maxLength:5,required:false},
    { index:49, value: 'cdcn', key: ' شماره کوتاژ اظهارنامه گمرکی' ,type:'string',minLength:0,maxLength:14,required:false},
    { index:50, value: 'cdcd', key: ' تاریخ کوتاژ اظهارنامه گمرکی' ,type:'int',minLength:0,maxLength:5,required:false},
    { index:51, value: 'crn', key: 'شناسه یکتای ثبت  قرارداد فروشنده' ,type:'string',minLength:0,maxLength:12,required:false},
    { index:52, value: 'billid', key: 'شماره اشتراک/ شناسه قبض بهره بردار' ,type:'string',minLength:0,maxLength:19,required:false},
    { index:53, value: 'tprdis', key: '  مجموع مبلغ قبل از کسر تخفیف' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:54, value: 'tdis', key: ' مجموع تخفیفات' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:55, value: 'tadis', key: 'مجموع مبلغ پس از کسر تخفیف' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:56, value: 'tvam', key: '  مجموع مالیات بر ارزش افزوده' ,type:'double',minLength:0,maxLength:18.0,required:true},
    { index:57, value: 'todam', key: ' مجموع سایر مالیات، عوارض و وجوه قانونی' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:58, value: 'tbill', key: ' مجموع صورتحساب' ,type:'double',minLength:0,maxLength:18.0,required:true},
    { index:59, value: 'tonw', key: ' مجموع وزن خالص' ,type:'double',minLength:0,maxLength:16.3,required:false},
    { index:60, value: 'torv', key: ' مجموع ارزش ریالی' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:61, value: 'tocv', key: ' مجموع ارزش ارزی' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:62, value: 'stem', key: 'روش تسویه' ,type:'int',minLength:1,maxLength:1,required:false},
    { index:63, value: 'cap', key: 'مبلغ پرداختی نقدی' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:64, value: 'insp', key: 'مبلغ نسیه' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:65, value: 'tvop', key: 'مجموع سهم مالیات بر ارزش افزوده از  پرداخت' ,type:'double',minLength:0,maxLength:18.0,required:false},
    { index:66, value: 'tax17', key: '17 ماده موضوع مال' ,type:'double',minLength:0,maxLength:18.0,required:false},
    //payments********************************************************************************************************** */
    { index:67, value: 'iinn', key: ' شماره سوییچ پرداخت' ,type:'string',minLength:9,maxLength:9,required:false},
    { index:68, value: 'acn', key: ' شماره پذیرنده فروشگاهی' ,type:'string',minLength:14,maxLength:14,required:false},
    { index:69, value: 'trmn', key: ' شماره پایانه' ,type:'string',minLength:8,maxLength:8,required:false},
    { index:70, value: 'pmt', key: ' روش پرداخت' ,type:'int',minLength:0,maxLength:2,required:false},
    { index:71, value: 'trn', key: ' شماره پیگیری/ شماره مرجع' ,type:'string',minLength:0,maxLength:14,required:false},
    { index:72, value: 'pcn', key: ' شماره کارت پرداخت کننده صورتحساب' ,type:'string',minLength:16,maxLength:16,required:false},
    { index:73, value: 'pid', key: ' شماره/ شناسه ملی/کد فراگیر پرداخت کننده صورتحساب' ,type:'string',minLength:0,maxLength:12,required:false},
    { index:74, value: 'pdt', key: ' تاریخ و زمان پرداخت صورتحساب' ,type:'double',minLength:0,maxLength:13.0,required:false},
    { index:74, value: 'pv', key: ' مبلغ پرداختی' ,type:'double',minLength:0,maxLength:18.0,required:false}



  ];

  constructor() { }

  ngOnInit(): void {

  }
  onFileChange(evt: any) {
    
    debugger;
    const target : DataTransfer =  <DataTransfer>(evt.target);
    
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname : string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log(this.data);

      let x = this.data.slice(1);
      console.log(x);
    };
    reader.onloadend=()=>{
      callSelect2();

    }

    reader.readAsBinaryString(target.files[0]);
  }


}
