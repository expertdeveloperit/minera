import { Component, OnInit,Input } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute,Router} from '@angular/router';
import { UrlConfig } from './../../services/urlProviders';
import {CommonService} from './../../services/common.service';
import { Headers,RequestOptions } from '@angular/http';
declare var $: any; 

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  total_contaract = 0;
  hash=[];
  totalhash = 0;
  orderInfo=[];
  price;
  public datasec;
  public loading = false;//loader
  coinName;
  UserData;
  userId;
  breakEvenArr = [];
  breakEven = 0;

  constructor(private http: Http,private route:Router,private service:CommonService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).uid;
    this.coinName = this.route.url.substring(this.route.url.lastIndexOf("/") + 1);
     this.loading = true;
     let URL="";
     let PriceUrl = "";


        if(this.coinName == "btc"){ 
          URL =  UrlConfig.orders.getBtcOrders;
          PriceUrl = UrlConfig.dashboard.getbtcprice;
        }
       if(this.coinName == "ltc"){
          URL =  UrlConfig.orders.getLtcOrders;
          PriceUrl = UrlConfig.dashboard.getltcprice;
       }
       if(this.coinName == "eth") {
           URL =  UrlConfig.orders.getEthOrders;
           PriceUrl = UrlConfig.dashboard.getethprice
        }
       if(this.coinName == "dash"){
          URL =  UrlConfig.orders.getDashOrders;
          PriceUrl = UrlConfig.dashboard.getDashprice;
       }

        this.service.getExternalData(PriceUrl).subscribe((data)=> {
          if(this.coinName =="dash"){
            this.price = parseFloat(data.Markets[0].Price);
          }else{
             this.price = parseFloat(data.data.rates.USD);
          }  
          this.service.get(URL).subscribe((data)=> {
             this.orderInfo = data;
             this.total_contaract = this.orderInfo.length;
             this.loading = false; 
             this.hashsum();
         });
        });            
    }
    // --Bottom Table year month--

    breakEvenMon(data,estimatedmo,month){
      let val = parseFloat(data['cost'].replace('$','').replace(',','')) /  ( parseFloat(data[estimatedmo]) * month );
      return val.toFixed(2);
    }
    
    //--TotalHash 
    hashsum(){
        var sum = 0;var sum1 = 0;
        for(var i=0; i<this.total_contaract; i++){
          let c = parseFloat(this.orderInfo[i]['cost'].replace('$','').replace(',',''));
          let ea = parseFloat(this.orderInfo[i]['estimatedday']) * this.price;
          let be =  parseInt((c/ea).toString());  
          this.breakEvenArr.push(be);
          this.hash.push(this.orderInfo[i].hashpower);           
        }
        for(var s=0; s<this.hash.length; s++){
           sum = sum + parseInt(this.hash[s]);
        }
        this.totalhash = sum;

        for(var s=0; s<this.breakEvenArr.length; s++){
          if(this.breakEvenArr[s]){
            sum1 = sum1 + this.breakEvenArr[s];
          }
        }
        this.breakEven = sum1;
      }

//--EvenPower
    getBreakEven(i){
      
      let c = parseFloat(i['cost'].replace('$','').replace(',',''));
      let ea = parseFloat(i['estimatedday']) * parseFloat(this.price);
      let be =  parseInt((c/ea).toString());
      return be;

    }

    refreshDatatable(){
      if(!$( "#orderTable" ).hasClass("init")){
        $('#orderTable').DataTable();
        $( "#orderTable" ).addClass("init");
      }
    }
    refreshDatatableSec(){
      if(!$( "#orderTableSec" ).hasClass("init")){
        $('#orderTableSec').DataTable();
        $( "#orderTableSec" ).addClass("init");
      }
    }

    
}