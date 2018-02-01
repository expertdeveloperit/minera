import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute,Router} from '@angular/router';
import { UrlConfig } from '../../../services/urlProviders';
import {CommonService} from '../../../services/common.service';
declare var $: any; 

@Component({
  selector: 'app-adminorders',
  templateUrl: './adminorders.component.html',
  styleUrls: ['./adminorders.component.css']
})
export class AdminordersComponent implements OnInit {

  public data;
  public datasec;
  public loading = false;//loader
  orderInfo=[];


  constructor(private http: Http,private route:Router,private service:CommonService) { }
  ngOnInit(): void {
    this.loading = true;
     let URL="";
     let PriceUrl = "";
     URL =  UrlConfig.admin.getorders;
     PriceUrl = UrlConfig.admin.getbtcprice;
 
     this.service.get(URL).subscribe((data)=> {
       this.orderInfo = data;
       this.loading = false; 
       console.log("ok",this.orderInfo);
    });
  }
  
    refreshDatatable(){
      if(!$( "#orderTable" ).hasClass("init")){
        $('#orderTable').DataTable();
        $( "#orderTable" ).addClass("init");
      }
    }
}
