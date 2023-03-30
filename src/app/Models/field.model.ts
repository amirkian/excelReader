export class Field {
  index:number;
  value:string;
  key:string;
  minLength:number;
  maxLength:number;
  required:boolean;
     
    constructor(index:number, value:string,key:string,minLength:number,maxLength:number,required:boolean) {
      this.index=index;
      this.value=value;
      this.key=key;
      this.minLength=minLength;
      this.maxLength=maxLength;
      this.required=required;
    }
  }

  //{ index:0, value: 'sstid', key: 'شناسه کالا/خدمت' ,minLength:13,maxLength:13,required:true}