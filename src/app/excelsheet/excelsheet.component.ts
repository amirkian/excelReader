import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Field } from '../Models/field.model';
import $ = require('jquery');
import { Header } from '../Models/header.model';
import { Body } from '../Models/body.model';
import { Payment } from '../Models/payment.model';

declare function callSelect2(): any;
const FileSaver = require('file-saver');



@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.sass']
})
export class ExcelsheetComponent implements OnInit {
  public data!: [][];
  public header = new Header();
  public payment = new Payment();
  public bodyList: Body[][] = [];


  // fields = [
  //   { index:-1, value: 'none', key: 'هیچکدام' },
  //   //body********************************************************************************************************** */
  //   { index:0, value: 'sstid', key: 'شناسه کالا/خدمت' ,minLength:13,maxLength:13,required:true},
  //   { index:1, value: 'sstt', key: 'شرح کالا/خدمت' ,minLength:0,maxLength:400,required:false},
  //   { index:2, value: 'am', key: 'عداد/مقدار' ,minLength:0,maxLength:13.99999999,required:true},
  //   { index:3, value: 'mu', key: 'واحد اندازهگیری' ,minLength:0,maxLength:8,required:false},
  //   { index:4, value: 'nw', key: 'وزن خالص' ,minLength:0,maxLength:16.999,required:false},
  //   { index:5, value: 'fee', key: 'مبلغ واحد' ,minLength:0,maxLength:18.99999999,required:false},
  //   { index:6, value: 'cfee', key: 'میزان ارز' ,minLength:0,maxLength:15.9999,required:false},
  //   { index:7, value: 'cut', key: 'نوع ارز' ,minLength:3,maxLength:3,required:false},
  //   { index:8, value: 'exr', key: 'نرخ برابری ارز با ریال' ,type:'long',minLength:0,maxLength:18,required:false},
  //   { index:9, value: 'ssrv', key: 'ارزش ریالی کالا' ,minLength:0,maxLength:18.0,required:false},
  //   { index:10, value: 'sscv', key: 'ارزش ارزی کالا' ,minLength:0,maxLength:15.9999,required:false},
  //   { index:11, value: 'prdis', key: 'مبلغ قبل از تخفیف' ,minLength:0,maxLength:18.0,required:false},
  //   { index:12, value: 'dis', key: 'مبلغ تخفیف' ,minLength:0,maxLength:18.0,required:false},
  //   { index:13, value: 'adis', key: 'مبلغ بعد از تخفیف' ,minLength:0,maxLength:18.0,required:false},
  //   { index:14, value: 'vra', key: 'نرخ مالیات بر ارزش افزوده' ,minLength:0,maxLength:3.2,required:false},
  //   { index:15, value: 'vam', key: 'مبلغ مالیات بر ارزش افزوده' ,minLength:0,maxLength:18.0,required:false},
  //   { index:16, value: 'odt', key: 'موضوع سایر  مالیات وعوارض' ,minLength:0,maxLength:255,required:false},
  //   { index:17, value: 'odr', key: 'نرخ سایر   مالیات و عوارض' ,minLength:0,maxLength:3.2,required:false},
  //   { index:18, value: 'odam', key: 'مبلغ سایر  مالیات و عوارض' ,minLength:0,maxLength:18.0,required:false},
  //   { index:19, value: 'olt', key: 'موضوع سایر وجوه  قانونی' ,minLength:0,maxLength:255,required:false},
  //   { index:20, value: 'olr', key: 'نرخ سایر وجوه  قانونی' ,minLength:0,maxLength:3.2,required:false},
  //   { index:21, value: 'olam', key: 'مبلغ سایر  وجوه  قانونی' ,minLength:0,maxLength:18.0,required:false},
  //   { index:22, value: 'consfee', key: 'اجرت ساخت' ,minLength:0,maxLength:18.0,required:false},
  //   { index:23, value: 'spro', key: 'سود فروشنده' ,minLength:0,maxLength:18.0,required:false},
  //   { index:24, value: 'bros', key: 'حقالعمل' ,minLength:0,maxLength:18.0,required:false},
  //   { index:25, value: 'tcpbs', key: 'جمع کل اجرت، حقالعمل و سود' ,type:'',minLength:0,maxLength:18.0,required:false},
  //   { index:26, value: 'cop', key: 'سهم نقدی از پرداخت' ,minLength:0,maxLength:18.0,required:false},
  //   { index:27, value: 'vop', key: 'سهم مالیات بر ارزش افزوده از پرداخت' ,minLength:0,maxLength:18.0,required:false},
  //   { index:28, value: 'bsrn', key: 'شناسه یکتای ثبت قرارداد حقالعمل کاری' ,minLength:12,maxLength:12,required:false},
  //   { index:29, value: 'tsstam', key: ' مبلغ کل کالا/خدمت' ,minLength:0,maxLength:18.0,required:false},
  //   //header********************************************************************************************************** */
  //   { index:30, value: 'taxid', key: 'شماره منحصر به فرد مالیاتی' ,minLength:22,maxLength:22,required:true},
  //   { index:31, value: 'indatim', key: '  تاریخ و زمان صدور صورتحساب )میالدی(' ,minLength:0,maxLength:13.0,required:true},
  //   { index:32, value: 'Indati2m', key: ' تاریخ و زمان ایجاد صورتحساب )میالدی(' ,minLength:0,maxLength:13.0,required:false},
  //   { index:33, value: 'inty', key: ' مبلغ کل کالا/خدمت' ,minLength:1,maxLength:1,required:true},
  //   { index:34, value: 'inno', key: ' سریال صورتحساب داخلی حافظه مالیاتی' ,minLength:10,maxLength:10,required:false},
  //   { index:35, value: 'irtaxid', key: ' شماره منحصر به فرد مالیاتی صورتحساب مرجع' ,minLength:22,maxLength:22,required:false},
  //   { index:36, value: 'inp', key: ' الگوی صورتحساب' ,minLength:0,maxLength:2,required:true},
  //   { index:37, value: 'ins', key: ' مبلغ کل کالا/خدمت' ,minLength:1,maxLength:1,required:true},
  //   { index:38, value: 'tins', key: 'شماره اقتصادی فروشنده' ,minLength:11,maxLength:14,required:true},
  //   { index:39, value: 'tob', key: 'نوع شخص خریدار' ,minLength:1,maxLength:1,required:false},
  //   { index:40, value: 'bid', key: 'شناسه ملی/ شماره     ملی/    شناسه مشارکت     مدنی/ کد فراگیر     اتباع غیرایران    خریداشناسه ملی/ شماره  ملی/  شناسه مشارکت     مدنی/ کد فراگیر     اتباع غیرایرانی    خریدارر' ,minLength:10,maxLength:12,required:false},    { index:29, value: 'tsstam', key: ' مبلغ کل کالا/خدمت' ,minLength:0,maxLength:18.0,required:false},
  //   { index:41, value: 'tinb', key: 'شماره اقتصادی خریدار' ,minLength:11,maxLength:14,required:false},
  //   { index:42, value: 'sbc', key: 'کد شعبه فروشنده' ,minLength:0,maxLength:10,required:false},
  //   { index:43, value: 'bpc', key: 'کد پستی خریدار' ,minLength:10,maxLength:10,required:false},
  //   { index:44, value: 'bbc', key: 'کد شعبه خریدار' ,minLength:10,maxLength:10,required:false},
  //   { index:45, value: 'ft', key: 'نوع پرواز' ,minLength:1,maxLength:1,required:false},
  //   { index:46, value: 'bpn', key: 'شماره گذرنامه خریدار' ,minLength:9,maxLength:9,required:false},
  //   { index:47, value: 'scln', key: 'شماره پروانه  گمرکی' ,minLength:0,maxLength:14,required:false},
  //   { index:48, value: 'scc', key: 'کد گمرک محل  اظهار فروشنده' ,minLength:0,maxLength:5,required:false},
  //   { index:49, value: 'cdcn', key: ' شماره کوتاژ اظهارنامه گمرکی' ,minLength:0,maxLength:14,required:false},
  //   { index:50, value: 'cdcd', key: ' تاریخ کوتاژ اظهارنامه گمرکی' ,minLength:0,maxLength:5,required:false},
  //   { index:51, value: 'crn', key: 'شناسه یکتای ثبت  قرارداد فروشنده' ,minLength:0,maxLength:12,required:false},
  //   { index:52, value: 'billid', key: 'شماره اشتراک/ شناسه قبض بهره بردار' ,minLength:0,maxLength:19,required:false},
  //   { index:53, value: 'tprdis', key: '  مجموع مبلغ قبل از کسر تخفیف' ,minLength:0,maxLength:18.0,required:false},
  //   { index:54, value: 'tdis', key: ' مجموع تخفیفات' ,minLength:0,maxLength:18.0,required:false},
  //   { index:55, value: 'tadis', key: 'مجموع مبلغ پس از کسر تخفیف' ,minLength:0,maxLength:18.0,required:false},
  //   { index:56, value: 'tvam', key: '  مجموع مالیات بر ارزش افزوده' ,minLength:0,maxLength:18.0,required:true},
  //   { index:57, value: 'todam', key: ' مجموع سایر مالیات، عوارض و وجوه قانونی' ,minLength:0,maxLength:18.0,required:false},
  //   { index:58, value: 'tbill', key: ' مجموع صورتحساب' ,minLength:0,maxLength:18.0,required:true},
  //   { index:59, value: 'tonw', key: ' مجموع وزن خالص' ,minLength:0,maxLength:16.3,required:false},
  //   { index:60, value: 'torv', key: ' مجموع ارزش ریالی' ,minLength:0,maxLength:18.0,required:false},
  //   { index:61, value: 'tocv', key: ' مجموع ارزش ارزی' ,minLength:0,maxLength:18.0,required:false},
  //   { index:62, value: 'stem', key: 'روش تسویه' ,minLength:1,maxLength:1,required:false},
  //   { index:63, value: 'cap', key: 'مبلغ پرداختی نقدی' ,minLength:0,maxLength:18.0,required:false},
  //   { index:64, value: 'insp', key: 'مبلغ نسیه' ,minLength:0,maxLength:18.0,required:false},
  //   { index:65, value: 'tvop', key: 'مجموع سهم مالیات بر ارزش افزوده از  پرداخت' ,minLength:0,maxLength:18.0,required:false},
  //   { index:66, value: 'tax17', key: '17 ماده موضوع مال' ,minLength:0,maxLength:18.0,required:false},
  //   //payments********************************************************************************************************** */
  //   { index:67, value: 'iinn', key: ' شماره سوییچ پرداخت' ,minLength:9,maxLength:9,required:false},
  //   { index:68, value: 'acn', key: ' شماره پذیرنده فروشگاهی' ,minLength:14,maxLength:14,required:false},
  //   { index:69, value: 'trmn', key: ' شماره پایانه' ,minLength:8,maxLength:8,required:false},
  //   { index:70, value: 'pmt', key: ' روش پرداخت' ,minLength:0,maxLength:2,required:false},
  //   { index:71, value: 'trn', key: ' شماره پیگیری/ شماره مرجع' ,minLength:0,maxLength:14,required:false},
  //   { index:72, value: 'pcn', key: ' شماره کارت پرداخت کننده صورتحساب' ,minLength:16,maxLength:16,required:false},
  //   { index:73, value: 'pid', key: ' شماره/ شناسه ملی/کد فراگیر پرداخت کننده صورتحساب' ,minLength:0,maxLength:12,required:false},
  //   { index:74, value: 'pdt', key: ' تاریخ و زمان پرداخت صورتحساب' ,minLength:0,maxLength:13.0,required:false},
  //   { index:74, value: 'pv', key: ' مبلغ پرداختی' ,minLength:0,maxLength:18.0,required:false}



  // ];
  fields = [
    //body********************************************************************************************************** */
    { index: 0, value: 'sstid', key: 'شناسه کالا/خدمت', minLength: 13, maxLength: 13, required: true },
    { index: 1, value: 'sstt', key: 'شرح کالا/خدمت', minLength: 0, maxLength: 400, required: false },
    { index: 2, value: 'am', key: 'عداد/مقدار', minLength: 0, maxLength: 13.99999999, required: true },
    { index: 3, value: 'mu', key: 'واحد اندازهگیری', minLength: 0, maxLength: 8, required: false },
    { index: 4, value: 'nw', key: 'وزن خالص', minLength: 0, maxLength: 16.999, required: false },
    { index: 5, value: 'fee', key: 'مبلغ واحد', minLength: 0, maxLength: 18.99999999, required: false },
    { index: 6, value: 'cfee', key: 'میزان ارز', minLength: 0, maxLength: 15.9999, required: false },
    { index: 7, value: 'cut', key: 'نوع ارز', minLength: 3, maxLength: 3, required: false },
    { index: 8, value: 'exr', key: 'نرخ برابری ارز با ریال', minLength: 0, maxLength: 18, required: false },
    { index: 9, value: 'ssrv', key: 'ارزش ریالی کالا', minLength: 0, maxLength: 18.0, required: false },
    { index: 10, value: 'sscv', key: 'ارزش ارزی کالا', minLength: 0, maxLength: 15.9999, required: false },
    { index: 11, value: 'prdis', key: 'مبلغ قبل از تخفیف', minLength: 0, maxLength: 18.0, required: false },
    { index: 12, value: 'dis', key: 'مبلغ تخفیف', minLength: 0, maxLength: 18.0, required: false },
    { index: 13, value: 'adis', key: 'مبلغ بعد از تخفیف', minLength: 0, maxLength: 18.0, required: false },
    { index: 14, value: 'vra', key: 'نرخ مالیات بر ارزش افزوده', minLength: 0, maxLength: 3.2, required: false },
    { index: 15, value: 'vam', key: 'مبلغ مالیات بر ارزش افزوده', minLength: 0, maxLength: 18.0, required: false },
    { index: 16, value: 'odt', key: 'موضوع سایر  مالیات وعوارض', minLength: 0, maxLength: 255, required: false },
    { index: 17, value: 'odr', key: 'نرخ سایر   مالیات و عوارض', minLength: 0, maxLength: 3.2, required: false },
    { index: 18, value: 'odam', key: 'مبلغ سایر  مالیات و عوارض', minLength: 0, maxLength: 18.0, required: false },
    { index: 19, value: 'olt', key: 'موضوع سایر وجوه  قانونی', minLength: 0, maxLength: 255, required: false },
    { index: 20, value: 'olr', key: 'نرخ سایر وجوه  قانونی', minLength: 0, maxLength: 3.2, required: false },
    { index: 21, value: 'olam', key: 'مبلغ سایر  وجوه  قانونی', minLength: 0, maxLength: 18.0, required: false },
    { index: 22, value: 'consfee', key: 'اجرت ساخت', minLength: 0, maxLength: 18.0, required: false },
    { index: 23, value: 'spro', key: 'سود فروشنده', minLength: 0, maxLength: 18.0, required: false },
    { index: 24, value: 'bros', key: 'حقالعمل', minLength: 0, maxLength: 18.0, required: false },
    { index: 25, value: 'tcpbs', key: 'جمع کل اجرت، حقالعمل و سود', type: '', minLength: 0, maxLength: 18.0, required: false },
    { index: 26, value: 'cop', key: 'سهم نقدی از پرداخت', minLength: 0, maxLength: 18.0, required: false },
    { index: 27, value: 'vop', key: 'سهم مالیات بر ارزش افزوده از پرداخت', minLength: 0, maxLength: 18.0, required: false },
    { index: 28, value: 'bsrn', key: 'شناسه یکتای ثبت قرارداد حقالعمل کاری', minLength: 12, maxLength: 12, required: false },
    { index: 29, value: 'tsstam', key: ' مبلغ کل کالا/خدمت', minLength: 0, maxLength: 18.0, required: false },
    //header********************************************************************************************************** */
    { index: 30, value: 'taxid', key: 'شماره منحصر به فرد مالیاتی', minLength: 22, maxLength: 22, required: true },
    { index: 31, value: 'indatim', key: '  تاریخ و زمان صدور صورتحساب )میالدی(', minLength: 0, maxLength: 13.0, required: true },
    { index: 32, value: 'Indati2m', key: ' تاریخ و زمان ایجاد صورتحساب )میالدی(', minLength: 0, maxLength: 13.0, required: false },
    { index: 33, value: 'inty', key: ' مبلغ کل کالا/خدمت', minLength: 1, maxLength: 1, required: true },
    { index: 34, value: 'inno', key: ' سریال صورتحساب داخلی حافظه مالیاتی', minLength: 10, maxLength: 10, required: false },
    { index: 35, value: 'irtaxid', key: ' شماره منحصر به فرد مالیاتی صورتحساب مرجع', minLength: 22, maxLength: 22, required: false },
    { index: 36, value: 'inp', key: ' الگوی صورتحساب', minLength: 0, maxLength: 2, required: true },
    { index: 37, value: 'ins', key: ' مبلغ کل کالا/خدمت', minLength: 1, maxLength: 1, required: true },
    { index: 38, value: 'tins', key: 'شماره اقتصادی فروشنده', minLength: 11, maxLength: 14, required: true },
    { index: 39, value: 'tob', key: 'نوع شخص خریدار', minLength: 1, maxLength: 1, required: false },
    { index: 40, value: 'bid', key: 'شناسه ملی/ شماره     ملی/    شناسه مشارکت     مدنی/ کد فراگیر     اتباع غیرایران    خریداشناسه ملی/ شماره  ملی/  شناسه مشارکت     مدنی/ کد فراگیر     اتباع غیرایرانی    خریدارر', minLength: 10, maxLength: 12, required: false }, { index: 29, value: 'tsstam', key: ' مبلغ کل کالا/خدمت', minLength: 0, maxLength: 18.0, required: false },
    { index: 41, value: 'tinb', key: 'شماره اقتصادی خریدار', minLength: 11, maxLength: 14, required: false },
    { index: 42, value: 'sbc', key: 'کد شعبه فروشنده', minLength: 0, maxLength: 10, required: false },
    { index: 43, value: 'bpc', key: 'کد پستی خریدار', minLength: 10, maxLength: 10, required: false },
    { index: 44, value: 'bbc', key: 'کد شعبه خریدار', minLength: 10, maxLength: 10, required: false },
    { index: 45, value: 'ft', key: 'نوع پرواز', minLength: 1, maxLength: 1, required: false },
    { index: 46, value: 'bpn', key: 'شماره گذرنامه خریدار', minLength: 9, maxLength: 9, required: false },
    { index: 47, value: 'scln', key: 'شماره پروانه  گمرکی', minLength: 0, maxLength: 14, required: false },
    { index: 48, value: 'scc', key: 'کد گمرک محل  اظهار فروشنده', minLength: 0, maxLength: 5, required: false },
    { index: 49, value: 'cdcn', key: ' شماره کوتاژ اظهارنامه گمرکی', minLength: 0, maxLength: 14, required: false },
    { index: 50, value: 'cdcd', key: ' تاریخ کوتاژ اظهارنامه گمرکی', minLength: 0, maxLength: 5, required: false },
    { index: 51, value: 'crn', key: 'شناسه یکتای ثبت  قرارداد فروشنده', minLength: 0, maxLength: 12, required: false },
    { index: 52, value: 'billid', key: 'شماره اشتراک/ شناسه قبض بهره بردار', minLength: 0, maxLength: 19, required: false },
    { index: 53, value: 'tprdis', key: '  مجموع مبلغ قبل از کسر تخفیف', minLength: 0, maxLength: 18.0, required: false },
    { index: 54, value: 'tdis', key: ' مجموع تخفیفات', minLength: 0, maxLength: 18.0, required: false },
    { index: 55, value: 'tadis', key: 'مجموع مبلغ پس از کسر تخفیف', minLength: 0, maxLength: 18.0, required: false },
    { index: 56, value: 'tvam', key: '  مجموع مالیات بر ارزش افزوده', minLength: 0, maxLength: 18.0, required: true },
    { index: 57, value: 'todam', key: ' مجموع سایر مالیات، عوارض و وجوه قانونی', minLength: 0, maxLength: 18.0, required: false },
    { index: 58, value: 'tbill', key: ' مجموع صورتحساب', minLength: 0, maxLength: 18.0, required: true },
    { index: 59, value: 'tonw', key: ' مجموع وزن خالص', minLength: 0, maxLength: 16.3, required: false },
    { index: 60, value: 'torv', key: ' مجموع ارزش ریالی', minLength: 0, maxLength: 18.0, required: false },
    { index: 61, value: 'tocv', key: ' مجموع ارزش ارزی', minLength: 0, maxLength: 18.0, required: false },
    { index: 62, value: 'stem', key: 'روش تسویه', minLength: 1, maxLength: 1, required: false },
    { index: 63, value: 'cap', key: 'مبلغ پرداختی نقدی', minLength: 0, maxLength: 18.0, required: false },
    { index: 64, value: 'insp', key: 'مبلغ نسیه', minLength: 0, maxLength: 18.0, required: false },
    { index: 65, value: 'tvop', key: 'مجموع سهم مالیات بر ارزش افزوده از  پرداخت', minLength: 0, maxLength: 18.0, required: false },
    { index: 66, value: 'tax17', key: '17 ماده موضوع مال', minLength: 0, maxLength: 18.0, required: false },
    //payments********************************************************************************************************** */
    { index: 67, value: 'iinn', key: ' شماره سوییچ پرداخت', minLength: 9, maxLength: 9, required: false },
    { index: 68, value: 'acn', key: ' شماره پذیرنده فروشگاهی', minLength: 14, maxLength: 14, required: false },
    { index: 69, value: 'trmn', key: ' شماره پایانه', minLength: 8, maxLength: 8, required: false },
    { index: 70, value: 'pmt', key: ' روش پرداخت', minLength: 0, maxLength: 2, required: false },
    { index: 71, value: 'trn', key: ' شماره پیگیری/ شماره مرجع', minLength: 0, maxLength: 14, required: false },
    { index: 72, value: 'pcn', key: ' شماره کارت پرداخت کننده صورتحساب', minLength: 16, maxLength: 16, required: false },
    { index: 73, value: 'pid', key: ' شماره/ شناسه ملی/کد فراگیر پرداخت کننده صورتحساب', minLength: 0, maxLength: 12, required: false },
    { index: 74, value: 'pdt', key: ' تاریخ و زمان پرداخت صورتحساب', minLength: 0, maxLength: 13.0, required: false },
    { index: 74, value: 'pv', key: ' مبلغ پرداختی', minLength: 0, maxLength: 18.0, required: false }



  ];
  fieldList: Field[] = this.fields;

  constructor() { }

  ngOnInit(): void {

  }
  onFileChange(evt: any) {

    debugger;
    const target: DataTransfer = <DataTransfer>(evt.target);

    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      console.log(ws);

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

      console.log(this.data);

      let x = this.data.slice(1);
      console.log(x);
    };
    reader.onloadend = () => {
      callSelect2();

    }

    reader.readAsBinaryString(target.files[0]);
  }

  onSubmit(contactForm) {
    debugger;
    var selectedFieldList = [{}];
    var selects = $('form select');
    $.each(selects, function (index, obj) {
      console.log(`${index}: ${obj}`);
      var field = $("#" + obj.id).val();
      if (field != null) {
        field = field.toString().match(/[^(\d+:\s+)]\w+/)?.toString();
        const index = obj.id.toString().match(/\d+/)?.toString();
        selectedFieldList.push({ 'index': index, 'field': field })
      }

    });
    console.log('select 0 vale:', $("#select0").val());
    const results = this.removeEmptyObjects(selectedFieldList);

    console.log('selectedFieldList:', results);
    //console.log(contactForm.value);
    this.mapFields(results);
  }

  removeEmptyObjects(array) {
    const newArray = array.filter(element => {
      if (Object.keys(element).length !== 0) {
        return true;
      }

      return false;
    });

    return newArray;
  }

  mapHeaderFields(selectedFieldList: any) {
    let headerField = ['taxid', 'indatim', 'Indati2m', 'inty', 'inno', 'irtaxid', 'inp', 'ins', 'tins', 'tob', 'bid', 'tinb', 'sbc', 'bpc', 'bbc', 'taxid', 'bpn', 'scln', 'scc', 'cdcn', 'crn', 'billid', 'tprdis', 'tdis', 'tadis', 'tvam', 'todam', 'tbill', 'tonw', 'torv', 'tocv', 'stem', 'cap', 'insp', 'tvop', 'tax17'];
    for (var item of headerField) {
      if (selectedFieldList.find(f => (f.field == 'taxid'))) {
        let index = selectedFieldList.find(f => (f.field == 'taxid')).index;
        let content = this.data?.[1][index];
        this.header.taxid = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'indatim'))) {
        let index = selectedFieldList.find(f => (f.field == 'indatim')).index;
        let content = this.data?.[1][index];
        this.header.indatim = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'Indati2m'))) {
        let index = selectedFieldList.find(f => (f.field == 'Indati2m')).index;
        let content = this.data?.[1][index];
        this.header.Indati2m = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'inty'))) {
        let index = selectedFieldList.find(f => (f.field == 'inty')).index;
        let content = this.data?.[1][index];
        this.header.inty = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'inno'))) {
        let index = selectedFieldList.find(f => (f.field == 'inno')).index;
        let content = this.data?.[1][index];
        this.header.inno = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'irtaxid'))) {
        let index = selectedFieldList.find(f => (f.field == 'irtaxid')).index;
        let content = this.data?.[1][index];
        this.header.irtaxid = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'inp'))) {
        let index = selectedFieldList.find(f => (f.field == 'inp')).index;
        let content = this.data?.[1][index];
        this.header.inp = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'ins'))) {
        let index = selectedFieldList.find(f => (f.field == 'ins')).index;
        let content = this.data?.[1][index];
        this.header.ins = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'tins'))) {
        let index = selectedFieldList.find(f => (f.field == 'tins')).index;
        let content = this.data?.[1][index];
        this.header.tins = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'tob'))) {
        let index = selectedFieldList.find(f => (f.field == 'tob')).index;
        let content = this.data?.[1][index];
        this.header.tob = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'bid'))) {
        let index = selectedFieldList.find(f => (f.field == 'bid')).index;
        let content = this.data?.[1][index];
        this.header.bid = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'tinb'))) {
        let index = selectedFieldList.find(f => (f.field == 'tinb')).index;
        let content = this.data?.[1][index];
        this.header.tinb = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'sbc'))) {
        let index = selectedFieldList.find(f => (f.field == 'sbc')).index;
        let content = this.data?.[1][index];
        this.header.sbc = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'bpc'))) {
        let index = selectedFieldList.find(f => (f.field == 'bpc')).index;
        let content = this.data?.[1][index];
        this.header.bpc = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'bbc'))) {
        let index = selectedFieldList.find(f => (f.field == 'bbc')).index;
        let content = this.data?.[1][index];
        this.header.bbc = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'taxid'))) {
        let index = selectedFieldList.find(f => (f.field == 'taxid')).index;
        let content = this.data?.[1][index];
        this.header.taxid = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'bpn'))) {
        let index = selectedFieldList.find(f => (f.field == 'bpn')).index;
        let content = this.data?.[1][index];
        this.header.bpn = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'scln'))) {
        let index = selectedFieldList.find(f => (f.field == 'scln')).index;
        let content = this.data?.[1][index];
        this.header.scln = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'scc'))) {
        let index = selectedFieldList.find(f => (f.field == 'scc')).index;
        let content = this.data?.[1][index];
        this.header.scc = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'cdcn'))) {
        let index = selectedFieldList.find(f => (f.field == 'cdcn')).index;
        let content = this.data?.[1][index];
        this.header.cdcn = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'crn'))) {
        let index = selectedFieldList.find(f => (f.field == 'crn')).index;
        let content = this.data?.[1][index];
        this.header.crn = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'billid'))) {
        let index = selectedFieldList.find(f => (f.field == 'billid')).index;
        let content = this.data?.[1][index];
        this.header.billid = content || '';
      }
      else if (selectedFieldList.find(f => (f.field == 'tprdis'))) {
        let index = selectedFieldList.find(f => (f.field == 'tprdis')).index;
        let content = this.data?.[1][index];
        this.header.tprdis = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'tdis'))) {
        let index = selectedFieldList.find(f => (f.field == 'tdis')).index;
        let content = this.data?.[1][index];
        this.header.tdis = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'tadis'))) {
        let index = selectedFieldList.find(f => (f.field == 'tadis')).index;
        let content = this.data?.[1][index];
        this.header.tadis = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'tvam'))) {
        let index = selectedFieldList.find(f => (f.field == 'tvam')).index;
        let content = this.data?.[1][index];
        this.header.tvam = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'todam'))) {
        let index = selectedFieldList.find(f => (f.field == 'todam')).index;
        let content = this.data?.[1][index];
        this.header.todam = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'tbill'))) {
        let index = selectedFieldList.find(f => (f.field == 'tbill')).index;
        let content = this.data?.[1][index];
        this.header.tbill = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'tbill'))) {
        let index = selectedFieldList.find(f => (f.field == 'tbill')).index;
        let content = this.data?.[1][index];
        this.header.tbill = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'tonw'))) {
        let index = selectedFieldList.find(f => (f.field == 'tonw')).index;
        let content = this.data?.[1][index];
        this.header.tonw = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'torv'))) {
        let index = selectedFieldList.find(f => (f.field == 'torv')).index;
        let content = this.data?.[1][index];
        this.header.torv = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'tocv'))) {
        let index = selectedFieldList.find(f => (f.field == 'tocv')).index;
        let content = this.data?.[1][index];
        this.header.tocv = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'stem'))) {
        let index = selectedFieldList.find(f => (f.field == 'stem')).index;
        let content = this.data?.[1][index];
        this.header.stem = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'cap'))) {
        let index = selectedFieldList.find(f => (f.field == 'cap')).index;
        let content = this.data?.[1][index];
        this.header.cap = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'insp'))) {
        let index = selectedFieldList.find(f => (f.field == 'insp')).index;
        let content = this.data?.[1][index];
        this.header.insp = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'tvop'))) {
        let index = selectedFieldList.find(f => (f.field == 'tvop')).index;
        let content = this.data?.[1][index];
        this.header.tvop = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'tax17'))) {
        let index = selectedFieldList.find(f => (f.field == 'tax17')).index;
        let content = this.data?.[1][index];
        this.header.tax17 = content || 0;
      }


    }
  }
  mapPaymentFields(selectedFieldList: any) {
    let paymentField = ['iinn', 'acn', 'trmn', 'pmt', 'trn', 'pcn', 'pid', 'pdt', 'pv'];
    for (var item of paymentField) {
      if (selectedFieldList.find(f => (f.field == 'iinn'))) {
        let index = selectedFieldList.find(f => (f.field == 'iinn')).index;
        let content = this.data?.[1][index];
        this.payment.iinn = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'acn'))) {
        let index = selectedFieldList.find(f => (f.field == 'acn')).index;
        let content = this.data?.[1][index];
        this.payment.acn = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'trmn'))) {
        let index = selectedFieldList.find(f => (f.field == 'trmn')).index;
        let content = this.data?.[1][index];
        this.payment.trmn = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'pmt'))) {
        let index = selectedFieldList.find(f => (f.field == 'pmt')).index;
        let content = this.data?.[1][index];
        this.payment.pmt = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'trn'))) {
        let index = selectedFieldList.find(f => (f.field == 'trn')).index;
        let content = this.data?.[1][index];
        this.payment.trn = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'pcn'))) {
        let index = selectedFieldList.find(f => (f.field == 'pcn')).index;
        let content = this.data?.[1][index];
        this.payment.pcn = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'pid'))) {
        let index = selectedFieldList.find(f => (f.field == 'pid')).index;
        let content = this.data?.[1][index];
        this.payment.pid = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'pdt'))) {
        let index = selectedFieldList.find(f => (f.field == 'pdt')).index;
        let content = this.data?.[1][index];
        this.payment.pdt = content || 0;
      }
      else if (selectedFieldList.find(f => (f.field == 'pv'))) {
        let index = selectedFieldList.find(f => (f.field == 'pv')).index;
        let content = this.data?.[1][index];
        this.payment.pv = content || 0;
      }
    }
  }
  mapBodyFields(selectedFieldList: any) {
    debugger;
    let bodyField = ['sstt', 'am', 'mu', 'nw', 'fee', 'cfee', 'cut', 'exr', 'ssrv', 'prdis', 'dis', 'adis', 'vra', 'vam', 'odt', 'odr', 'odam', 'olt', 'olr', 'consfee', 'spro', 'bros', 'tcpbs', 'cop', 'vop', 'bsrn', 'tsstam'];
    let bodyarr: Body[] = [];

    let conter = 0;
    for (var item of this.data.slice(1)) {
      conter++;
      var body = new Body();
      if (selectedFieldList.find(f => (f.field == 'sstt'))) {
        let index = selectedFieldList.find(f => (f.field == 'sstt')).index;
        let content = this.data?.[conter][index];
        body.sstt = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'am'))) {
        let index = selectedFieldList.find(f => (f.field == 'am')).index;
        let content = this.data?.[conter][index];
        body.am = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'mu'))) {
        let index = selectedFieldList.find(f => (f.field == 'mu')).index;
        let content = this.data?.[conter][index];
        body.mu = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'nw'))) {
        let index = selectedFieldList.find(f => (f.field == 'nw')).index;
        let content = this.data?.[conter][index];
        body.nw = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'fee'))) {
        let index = selectedFieldList.find(f => (f.field == 'fee')).index;
        let content = this.data?.[conter][index];
        body.fee = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'cfee'))) {
        let index = selectedFieldList.find(f => (f.field == 'cfee')).index;
        let content = this.data?.[conter][index];
        body.cfee = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'cut'))) {
        let index = selectedFieldList.find(f => (f.field == 'cut')).index;
        let content = this.data?.[conter][index];
        body.cut = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'exr'))) {
        let index = selectedFieldList.find(f => (f.field == 'exr')).index;
        let content = this.data?.[conter][index];
        body.exr = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'ssrv'))) {
        let index = selectedFieldList.find(f => (f.field == 'ssrv')).index;
        let content = this.data?.[conter][index];
        body.ssrv = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'prdis'))) {
        let index = selectedFieldList.find(f => (f.field == 'prdis')).index;
        let content = this.data?.[conter][index];
        body.prdis = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'dis'))) {
        let index = selectedFieldList.find(f => (f.field == 'dis')).index;
        let content = this.data?.[conter][index];
        body.dis = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'adis'))) {
        let index = selectedFieldList.find(f => (f.field == 'adis')).index;
        let content = this.data?.[conter][index];
        body.adis = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'vra'))) {
        let index = selectedFieldList.find(f => (f.field == 'vra')).index;
        let content = this.data?.[conter][index];
        body.vra = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'vam'))) {
        let index = selectedFieldList.find(f => (f.field == 'vam')).index;
        let content = this.data?.[conter][index];
        body.vam = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'odt'))) {
        let index = selectedFieldList.find(f => (f.field == 'odt')).index;
        let content = this.data?.[conter][index];
        body.odt = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'odr'))) {
        let index = selectedFieldList.find(f => (f.field == 'odr')).index;
        let content = this.data?.[conter][index];
        body.odr = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'consfee'))) {
        let index = selectedFieldList.find(f => (f.field == 'consfee')).index;
        let content = this.data?.[conter][index];
        body.consfee = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'spro'))) {
        let index = selectedFieldList.find(f => (f.field == 'spro')).index;
        let content = this.data?.[conter][index];
        body.spro = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'bros'))) {
        let index = selectedFieldList.find(f => (f.field == 'bros')).index;
        let content = this.data?.[conter][index];
        body.bros = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'tcpbs'))) {
        let index = selectedFieldList.find(f => (f.field == 'tcpbs')).index;
        let content = this.data?.[conter][index];
        body.tcpbs = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'cop'))) {
        let index = selectedFieldList.find(f => (f.field == 'cop')).index;
        let content = this.data?.[conter][index];
        body.cop = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'vop'))) {
        let index = selectedFieldList.find(f => (f.field == 'vop')).index;
        let content = this.data?.[conter][index];
        body.vop = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'bsrn'))) {
        let index = selectedFieldList.find(f => (f.field == 'bsrn')).index;
        let content = this.data?.[conter][index];
        body.bsrn = content || 0;
      }
      if (selectedFieldList.find(f => (f.field == 'tsstam'))) {
        let index = selectedFieldList.find(f => (f.field == 'tsstam')).index;
        let content = this.data?.[conter][index];
        body.tsstam = content || 0;
      }
      bodyarr.push(body);

    }
    this.bodyList.push(bodyarr);
    debugger;
    console.log('this.body:', this.bodyList);
  }
  writeContents(content, fileName, contentType) {
    debugger;
    var a = document.createElement('a');
    var file = new Blob([JSON.stringify(content)], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    localStorage['jsonfile'] = JSON.stringify(content);
    console.log('jsonfile in localstorage is:', localStorage['jsonfile']);
    let flatObj = this.flattenObject({ "k2": "v1", "k4": "v2", "k3": { "k1": "v4", "k5": "v5" } });
    var myJSONString = JSON.stringify(flatObj);
    console.log('myJSONString:', myJSONString);
    // var encodedObj = this.MergeFlatedObjValue(flatObj);
    var encodedObj = this.SortAndMergeValueObj(flatObj);
    console.log('encodedObj:', encodedObj);

  }




  mapFields(selectedFieldList) {
    debugger;
    console.log('selectedFieldList:', selectedFieldList);
    console.log('data:', this.data);

    this.mapHeaderFields(selectedFieldList);
    this.mapPaymentFields(selectedFieldList);
    this.mapBodyFields(selectedFieldList);
    debugger;

    let expected = {
      "header": this.header,
      "body": [
        this.bodyList
      ],
      "payments": [
        this.payment
      ],
      "extension": [
        {
          "key": null,
          "value": null
        }
      ]
    }
    console.log('expected:', expected);
    this.writeContents(expected, 'Sample File' + '.txt', 'text/plain');


  }

  flattenObject(ob) {
    var toReturn = {};

    for (var i in ob) {
      if (!ob.hasOwnProperty(i)) continue;

      if ((typeof ob[i]) == 'object' && ob[i] !== null) {
        var flatObject = this.flattenObject(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;

          toReturn[i + '.' + x] = flatObject[x];
        }
      } else {
        toReturn[i] = ob[i];
      }
    }
    return toReturn;
  }
  // MergeFlatedObjValue(obj) {
  //   debugger;
  //   const myJSONString = JSON.stringify(obj);
  //   const regexp = /(?<!:)("[\w.]+")/g;
  //   let matches = myJSONString.matchAll(regexp);
  //   var MergeFlatedObjValue = "";
  //   var matchesArray: any[] = [];




  //   // for (const match of matches) {
  //   //   var matched = match[0];
  //   //   matched = matched.replace(/['"]+/g, '');
  //   //   var item = obj[matched];
  //   //   matchesArray.push(item.toString());

  //   // }
  //   const myObject = JSON.stringify(obj);
  //   const myArray = Object.entries(myObject);
  //   myArray.sort((a, b) => a[0].localeCompare(b[0]));
  //   const sortedObject = Object.fromEntries(myArray);
  //   const sortedJSONString = JSON.stringify(sortedObject);

  //   console.log('sortedJSONString:',sortedJSONString);


  //   return MergeFlatedObjValue;

  // }
  SortAndMergeValueObj(obj: any) {
    debugger;
    //let flatObj = this.flattenObject(obj);
    // let flatObj = this.flattenObject({ "k2": "v1", "k4": "v2", "k3": { "k1": "v4", "k5": "v5" } });
    var myJSONString = JSON.stringify(obj);//"{"k2":"v1","k4":"v2","k3.k1":"v4","k3.k5":"v5"}"
    const myObject = JSON.parse(myJSONString);
    const myArray = Object.entries(myObject);
    myArray.sort((a, b) => a[0].localeCompare(b[0]));
    const sortedObject = Object.fromEntries(myArray);
    const sortedJSONString = JSON.stringify(sortedObject);
    myJSONString = sortedJSONString.replace(/[{}]/g, "");//(16) [0, 3, 5, 8, 10, 13, 15, 18, 20, 26, 28, 31, 33, 39, 41, 44]
    const indexes: any[] = [];
    var mergedKey = "";
    for (let index = 0; index < myJSONString.length; index++) {
      if (myJSONString[index] == "\"") {
        indexes.push(index);
      }
      console.log(indexes);
    }
    debugger;
    for (var i = 0; i < indexes.length; i++) {
      debugger;
      let key = myJSONString.substring(indexes[i], indexes[i + 1]);
      key = key.slice(1);
      mergedKey += obj[key] + "#";
      i += 3;
    }
    console.log('mergedKey:', mergedKey);
    return mergedKey;
  }


}//end class

