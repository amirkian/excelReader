import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { Field } from '../Models/field.model';
import $ = require('jquery');
import { Header } from '../Models/header.model';
import { Body } from '../Models/body.model';
import { Payment } from '../Models/payment.model';

declare function callSelect2(): any;


@Component({
  selector: 'app-excelsheet',
  templateUrl: './excelsheet.component.html',
  styleUrls: ['./excelsheet.component.sass']
})
export class ExcelsheetComponent implements OnInit {
  data: [][] | undefined;
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
      var val = $("#" + obj.id).val();
      if (val != null) {
        val = val.toString().match(/[^(\d+:\s+)]\w+/)?.toString();
        const index = obj.id.toString().match(/\d+/)?.toString();
        selectedFieldList.push({ 'index': index, 'value': val })
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
  mapFields(selectedFieldList) {
    debugger;
    console.log('selectedFieldList:', selectedFieldList);
    console.log('data:', this.data);

    let header = new Header();
    if (selectedFieldList.find(f => (f.value == "taxid"))) { header.taxid = selectedFieldList.find(f => (f.value == "taxid")).value };
    if (selectedFieldList.find(f => (f.value == "indatim"))) { header.taxid = selectedFieldList.find(f => (f.value == "indatim")).value };
    if (selectedFieldList.find(f => (f.value == "Indati2m"))) { header.taxid = selectedFieldList.find(f => (f.value == "Indati2m")).value };
    if (selectedFieldList.find(f => (f.value == "inty"))) { header.taxid = selectedFieldList.find(f => (f.value == "inty")).value };
    if (selectedFieldList.find(f => (f.value == "inno"))) { header.taxid = selectedFieldList.find(f => (f.value == "inno")).value };
    if (selectedFieldList.find(f => (f.value == "irtaxid"))) { header.taxid = selectedFieldList.find(f => (f.value == "irtaxid")).value };
    if (selectedFieldList.find(f => (f.value == "inp"))) { header.taxid = selectedFieldList.find(f => (f.value == "inp")).value };
    if (selectedFieldList.find(f => (f.value == "ins"))) { header.taxid = selectedFieldList.find(f => (f.value == "ins")).value };
    if (selectedFieldList.find(f => (f.value == "tins"))) { header.taxid = selectedFieldList.find(f => (f.value == "tins")).value };
    if (selectedFieldList.find(f => (f.value == "tob"))) { header.taxid = selectedFieldList.find(f => (f.value == "tob")).value };
    if (selectedFieldList.find(f => (f.value == "bid"))) { header.taxid = selectedFieldList.find(f => (f.value == "bid")).value };
    if (selectedFieldList.find(f => (f.value == "tinb"))) { header.taxid = selectedFieldList.find(f => (f.value == "tinb")).value };
    if (selectedFieldList.find(f => (f.value == "sbc"))) { header.taxid = selectedFieldList.find(f => (f.value == "sbc")).value };
    if (selectedFieldList.find(f => (f.value == "bpc"))) { header.taxid = selectedFieldList.find(f => (f.value == "bpc")).value };
    if (selectedFieldList.find(f => (f.value == "bbc"))) { header.taxid = selectedFieldList.find(f => (f.value == "bbc")).value };
    if (selectedFieldList.find(f => (f.value == "taxid"))) { header.taxid = selectedFieldList.find(f => (f.value == "taxid")).value };
    if (selectedFieldList.find(f => (f.value == "bpn"))) { header.taxid = selectedFieldList.find(f => (f.value == "bpn")).value };
    if (selectedFieldList.find(f => (f.value == "scln"))) { header.taxid = selectedFieldList.find(f => (f.value == "scln")).value };
    if (selectedFieldList.find(f => (f.value == "scc"))) { header.taxid = selectedFieldList.find(f => (f.value == "scc")).value };
    if (selectedFieldList.find(f => (f.value == "cdcn"))) { header.taxid = selectedFieldList.find(f => (f.value == "cdcn")).value };
    if (selectedFieldList.find(f => (f.value == "cdcd"))) { header.taxid = selectedFieldList.find(f => (f.value == "cdcd")).value };
    if (selectedFieldList.find(f => (f.value == "crn"))) { header.taxid = selectedFieldList.find(f => (f.value == "crn")).value };
    if (selectedFieldList.find(f => (f.value == "billid"))) { header.taxid = selectedFieldList.find(f => (f.value == "billid")).value };
    if (selectedFieldList.find(f => (f.value == "tprdis"))) { header.taxid = selectedFieldList.find(f => (f.value == "tprdis")).value };
    if (selectedFieldList.find(f => (f.value == "tdis"))) { header.taxid = selectedFieldList.find(f => (f.value == "tdis")).value };
    if (selectedFieldList.find(f => (f.value == "tadis"))) { header.taxid = selectedFieldList.find(f => (f.value == "tadis")).value };
    if (selectedFieldList.find(f => (f.value == "tvam"))) { header.taxid = selectedFieldList.find(f => (f.value == "tvam")).value };
    if (selectedFieldList.find(f => (f.value == "todam"))) { header.taxid = selectedFieldList.find(f => (f.value == "todam")).value };
    if (selectedFieldList.find(f => (f.value == "tbill"))) { header.taxid = selectedFieldList.find(f => (f.value == "tbill")).value };
    if (selectedFieldList.find(f => (f.value == "tonw"))) { header.taxid = selectedFieldList.find(f => (f.value == "tonw")).value };
    if (selectedFieldList.find(f => (f.value == "torv"))) { header.taxid = selectedFieldList.find(f => (f.value == "torv")).value };
    if (selectedFieldList.find(f => (f.value == "tocv"))) { header.taxid = selectedFieldList.find(f => (f.value == "tocv")).value };
    if (selectedFieldList.find(f => (f.value == "stem"))) { header.taxid = selectedFieldList.find(f => (f.value == "stem")).value };
    if (selectedFieldList.find(f => (f.value == "cap"))) { header.taxid = selectedFieldList.find(f => (f.value == "cap")).value };
    if (selectedFieldList.find(f => (f.value == "insp"))) { header.taxid = selectedFieldList.find(f => (f.value == "insp")).value };
    if (selectedFieldList.find(f => (f.value == "tvop"))) { header.taxid = selectedFieldList.find(f => (f.value == "tvop")).value };
    if (selectedFieldList.find(f => (f.value == "tax17"))) { header.taxid = selectedFieldList.find(f => (f.value == "tax17")).value };

    // var body = new body();
    // body.sstid = "";
    // body.sstt = "";
    // body.am = 0;
    // body.mu = 0;
    // body.nw = 0;
    // body.fee = 0;
    // body.cfee = 0;
    // body.cut = "";
    // body.exr = 0;
    // body.ssrv = 0;
    // body.sscv = 0;
    // body.prdis = 0;
    // body.dis = 0;
    // body.adis = 0;
    // body.vra = 0;
    // body.vam = 0;
    // body.odt = "";
    // body.odr = 0;
    // body.odam = 0;
    // body.olt = "";
    // body.olr = 0;
    // body.consfee = 0;
    // body.spro = 0;
    // body.bros = 0;
    // body.tcpbs = 0;
    // body.cop = 0;
    // body.vop = 0;
    // body.bsrn = "";
    // body.tsstam = 0;

    var payment = new payment();
    payment.iinn = 0
    payment.acn = 0
    payment.trmn = 0;
    payment.pmt = 0;
    payment.trn = 0;
    payment.pcn = 0;
    payment.pid = 0;
    payment.pdt = 0
    payment.pv = 0;



    let expected = {
      "header": header,
      "body": [
        new Body("", "", 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, "", 0, 0, 0, 0, 0, 0, 0, "", 0),
        new Body("", "", 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, "", 0, 0, 0, 0, 0, 0, 0, "", 0),
        new Body("", "", 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, "", 0, 0, 0, 0, 0, 0, 0, "", 0),
        new Body("", "", 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, "", 0, 0, 0, 0, 0, 0, 0, "", 0),
        new Body("", "", 0, 0, 0, 0, 0, "", 0, 0, 0, 0, 0, 0, 0, 0, "", 0, 0, "", 0, 0, 0, 0, 0, 0, 0, "", 0),
      ],
      "payments": [
        payment
      ],
      "extension": [
        {
          "key": null,
          "value": null
        }
      ]
    }

  }



}
