import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common.service';
import { UrlConfig } from '../../services/urlProviders';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setup-orders',
  templateUrl: './setup-orders.component.html',
  styleUrls: ['./setup-orders.component.css']
})
export class SetupOrdersComponent implements OnInit {
users=[];
orders=[];
calculated_data:any={};
today:any;
dd:any;
mm:any;
yyyy:any;
user_id:any;
find_id=[];
  constructor(private service:CommonService, private router:Router,private toastr: ToastrService) { }

  ngOnInit() {
// Get Users 	
  	this.service.get(UrlConfig.users.get).subscribe((uinfo)=>{
      this.users = uinfo;
    });
// Get Orders
    this.service.get(UrlConfig.dashboard.getOrders).subscribe((uinfo)=>{
      this.orders = uinfo;
    });
  }
  onsetuporders(data){
   var daily = data.hashpower*0.0001731;
   var monthly = data.hashpower*0.0051920;
   var yearly = data.hashpower*0.0631700;
   var username = this.users.indexOf(data.username); 
   this.find_id =  this.users.filter(item => item.username ==data.username );
   
    if(this.find_id.length>0){

    }
    else{
      this.toastr.error("Username not found", 'OOPS');
      return false;
    }
    this.user_id = this.find_id[0].id;
    this.today = new Date();
    this.dd = this.today.getDate();
    this.mm = this.today.getMonth()+1; //January is 0!
    this.yyyy = this.today.getFullYear();
  	if(this.dd<10) {
  	    this.dd = '0'+this.dd
  	} 
  	if(this.mm<10) {
  	    this.mm = '0'+this.mm
  	} 
    this.today = this.mm + '/' + this.dd + '/' + this.yyyy;

    this.calculated_data = {hashpower:data.hashpower,paymenttype:data.paymenttype,contractlink:'...',invoicenumber:this.orders.length+1,userid:this.user_id,startdate:this.today,contractlength:24,cost:'',estimatedday:daily,estimatedmo:monthly,estimatedyr:yearly}

   	this.service.post(UrlConfig.dashboard.getOrders, this.calculated_data).subscribe((uinfo)=>{
      if(uinfo.id){
    	this.toastr.success('Your Order created successfully');
        this.router.navigate(['/Adminorders']);  
      }
      }, (err) => {
            this.toastr.error(err._body, 'OOPS');
    });
  }
}
