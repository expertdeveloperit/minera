import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute,Router} from '@angular/router';
import { UrlConfig } from '../../../services/urlProviders';
import {CommonService} from '../../../services/common.service';
declare var $: any; 

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
//--Global Variable--
  public data;
  public datasec;
  public loading = false;//loader
  rewardsInfo=[];
  rewardsPrice;
  totalRewards=0;
  constructor(private http: Http,private route:Router,private service:CommonService) { }
  ngOnInit(): void {
    this.loading = true;
     let URL="";
     let PriceUrl = "";
     URL =  UrlConfig.admin.getRewards;
     PriceUrl = UrlConfig.admin.getbtcprice;
//--Get Price--     
      this.service.getExternalData(PriceUrl).subscribe((data)=> {
       this.rewardsPrice = parseFloat(data.data.rates['USD']);
       console.log(this.rewardsPrice);
       //this.loading = false; 
      
    });
//--Get rewards All info--
     this.service.get(URL).subscribe((data)=> {
       this.rewardsInfo = data;
       var sum=0;
       for(let i=0;i<this.rewardsInfo.length;i++){
         sum = sum + parseInt(this.rewardsInfo[i].reward);
       }
       console.log("test",this.rewardsInfo);
       this.totalRewards=sum;
       this.loading = false; 
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


