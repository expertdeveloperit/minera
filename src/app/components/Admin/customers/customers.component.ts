import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute,Router} from '@angular/router';
import { UrlConfig } from '../../../services/urlProviders';
import {CommonService} from '../../../services/common.service';
declare var $: any; 

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
//--Global Variable--
  public data;
  public datasec;
  customerInfo=[];
  customerPrice=[];
  public loading = false;//loader
  constructor(private http: Http,private route:Router,private service:CommonService) { }
  ngOnInit(): void {
     this.loading = true;
     let URL="";
     let PriceUrl = "";
     URL =  UrlConfig.admin.getUsers;
     PriceUrl = UrlConfig.admin.getbtcprice;
//--Get Price--       
      this.service.getExternalData(PriceUrl).subscribe((data)=> {
       this.customerPrice = data.data.rates['USD'];
      // this.loading = false; 
      
    });
//--Get customer info--
     this.service.get(URL).subscribe((data)=> {
       this.customerInfo = data;
       this.loading = false; 
       console.log("ok",this.customerInfo);
    });
  }
//--Refresh table--
    refreshDatatable(){
      if(!$( "#orderTable" ).hasClass("init")){
        $('#orderTable').DataTable();
        $( "#orderTable" ).addClass("init");
      }
    }
}
