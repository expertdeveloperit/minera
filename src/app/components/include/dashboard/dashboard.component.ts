import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';//Toastr Service Show message
import { UrlConfig } from '../../../services/urlProviders';
import {CommonService} from '../../../services/common.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public data;
  public datasec;
  dashBoardInfo=[];
  dashBoardOrders=[];
  priceInfo;
  priceLtc;
  priceEth;
  priceDash;
  priceTicker;
  dashColocate=[];
  dashEthOrders=[];
  dashDashOrders=[];
  dashLtcOrders=[];
  btcHashPower = 0;
  ltcHashPower=0;
  DashHashPower=0;
  EthHashPower=0;
  colocatHashPower=0;
  userId;
  colocates = {'btc':{'contracts':[],'hashrate':0},'dash':{'contracts':[],'hashrate':0},'ltc':{'contracts':[],'hashrate':0},'eth':{'contracts':[],'hashrate':0}};
  public loading = false;//loader
  constructor(private service:CommonService,private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
     this.loading = true;
     this.userId = JSON.parse(localStorage.getItem('user')).uid;   
//--external Get command
     this.service.getExternalData(UrlConfig.dashboard.getbtcprice).subscribe((data)=> {
      this.priceInfo = data.data.rates['USD'];
      this.loading = false;      
    });
    this.service.getExternalData(UrlConfig.dashboard.getltcprice).subscribe((data)=> {
      this.priceLtc = data.data.rates['USD'];
      this.loading = false; 
    });
    this.service.getExternalData(UrlConfig.dashboard.getethprice).subscribe((data)=> {
      this.priceEth = data.data.rates['USD'];
      this.loading = false; 
    });
    this.service.getExternalData(UrlConfig.dashboard.getDashprice).subscribe((data)=> {
      this.priceDash = data.Markets[0].Price;
      this.loading = false; 
    });
    this.service.getExternalData(UrlConfig.dashboard.getPrice).subscribe((data)=> {
      this.priceTicker = data;
      this.loading = false; 
      
    });

//--Get command--

     this.service.get(UrlConfig.dashboard.userInfo).subscribe((data)=> {
       this.dashBoardInfo = data;
       this.loading = false; 
    });
//--Orders--BtcOrders---
      this.service.get(UrlConfig.dashboard.getOrders).subscribe((data)=> {
       this.dashBoardOrders = data;
       //--BTCHashRate
       for(let i=0;i<this.dashBoardOrders.length; i++){
        this.btcHashPower +=  parseFloat(this.dashBoardOrders[i].hashpower);
       }
       this.loading = false; 
    });
//--LtcOrders Get--
      this.service.get(UrlConfig.dashboard.getLtcOrders).subscribe((data)=> {
       this.dashLtcOrders = data;
       //--LTCHashRate
       for(let i=0;i<this.dashLtcOrders.length;i++){
         this.ltcHashPower += parseFloat(this.dashLtcOrders[i].hashpower);
       }
       this.loading = false; 
    });
//--DashOrders Get--
      this.service.get(UrlConfig.dashboard.getDashOrders).subscribe((data)=> {
       this.dashDashOrders = data;
       //--DashHashRate
       for(let i=0;i<this.dashDashOrders.length;i++){
         this.DashHashPower +=parseFloat(this.dashDashOrders[i].hashpower)
       }
       this.loading = false; 
    });
//--EthOrders Get--
      this.service.get(UrlConfig.dashboard.getEthOrders).subscribe((data)=> {
       this.dashEthOrders = data;
       for(let i=0;i<this.dashEthOrders.length;i++){
         this.EthHashPower +=parseFloat(this.dashEthOrders[i].hashpower)
       }
       this.loading = false; 
    });

//--ColocateOrdera Get-- 
      this.service.get(UrlConfig.dashboard.getcolocateOrders).subscribe((data)=> {
       this.dashColocate = data;
       let coins = ['btc','ltc','dash','eth'];
       for(let i=0;i<this.dashColocate.length;i++){
         this.colocatHashPower +=parseFloat(this.dashColocate[i].hashpower);
         var self = this;
         coins.forEach(function (coin) {
           if ((self.dashColocate[i]['cointype'].toString()).toLowerCase() == coin.toLowerCase()){
              //if (self.userId.toString() == self.dashColocate[i]['userid'].toString()){
                self.colocates[coin]['contracts'].push( self.dashColocate[i] );
                self.colocates[coin]['hashrate'] += parseInt(self.dashColocate[i]['hashpower']);
              //}                        
           }                    
        });               
       }
       this.loading = false; 
    });
  }

  USDEarning(type,status){
    if(type == 'btc'){
      let total = this.btcHashPower +this.colocates['btc']['hashrate'];
      if(total){
        let ratio;
          if(status){
            ratio = this.colocates['btc']['hashrate'] / total;
          }else{
            ratio = this.btcHashPower / total;
          }        
          let btcearnings = this.dashBoardInfo['btcavailible'] * ratio;
          return (btcearnings * this.priceInfo).toFixed(2);
      }
    }else if(type == 'ltc'){
       let total = this.ltcHashPower +this.colocates['ltc']['hashrate'];
        if(total){
          let ratio;
          if(status){
            ratio = this.colocates['ltc']['hashrate'] / total;          
          }else{
            ratio = this.ltcHashPower / total;          
          }
          let ltcearnings = this.dashBoardInfo['ltcavailible'] * ratio;
          return (ltcearnings* this.priceLtc).toFixed(2);
      } 
    }else if(type == 'dash'){
       let total = this.DashHashPower +this.colocates['dash']['hashrate'];
      if(total){
        let ratio;
        if(status){
          ratio = this.DashHashPower / total;
        }else{
          ratio = this.DashHashPower / total;
        }
          let dashearnings = this.dashBoardInfo['dashavailible'] * ratio;
          return (dashearnings* this.priceDash).toFixed(2);
      } 
    }else if(type == 'eth'){
       let total = this.EthHashPower +this.colocates['eth']['hashrate'];
      if(total){
        let ration;
        if(status){
          ration = this.colocates['eth']['hashrate'] / total;
        }else{
          ration = this.EthHashPower / total;
        }
          let ethearnings = this.dashBoardInfo['ethavailible'] * ration;
          return (ethearnings* this.priceEth).toFixed(2);
      } 
    }    
  }

  
}
