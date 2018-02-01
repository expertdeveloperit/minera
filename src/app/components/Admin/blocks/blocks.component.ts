import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute,Router} from '@angular/router';
import { UrlConfig } from '../../../services/urlProviders';
import {CommonService} from '../../../services/common.service';
declare var $: any; 

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.css']
})
export class BlocksComponent implements OnInit {

  public data;
  public datasec;
  public loading = false;//loader
  blockPrice;
  blockInfo=[];

  constructor(private http: Http,private route:Router,private service:CommonService) { }
    ngOnInit(): void {
    this.loading = true;
     let URL="";
     let PriceUrl = "";
     URL =  UrlConfig.admin.getRewards;
     PriceUrl = UrlConfig.admin.getbtcprice;
     
      this.service.getExternalData(PriceUrl).subscribe((data)=> {
       this.blockPrice = parseFloat(data.data.rates['USD']);
       //this.loading = false; 
      
    });

     this.service.get(URL).subscribe((data)=> {
       this.blockInfo = data;
       this.loading = false; 
    });
    }
    refreshDatatable(){
      if(!$( "#orderTable" ).hasClass("init")){
        $('#orderTable').DataTable();
        $( "#orderTable" ).addClass("init");
      }
    }
}
