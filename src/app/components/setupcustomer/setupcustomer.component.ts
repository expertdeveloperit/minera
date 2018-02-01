import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common.service';
import { UrlConfig } from '../../services/urlProviders';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-setupcustomer',
  templateUrl: './setupcustomer.component.html',
  styleUrls: ['./setupcustomer.component.css']
})
export class SetupcustomerComponent implements OnInit {
 data1:any={};
  constructor(private service:CommonService, private router:Router,private toastr: ToastrService) { }

  ngOnInit() {
  }
  onsetupcustomers(data){
    if(data.password != data.confirm_password){
      this.toastr.error("Password does not match", 'OOPS');
      return false;
    }else{  
      this.data1 = {referrals:0,btcavailible:0,btcaddress:'.',ltcaddress:'.',dashaddress:'.',accounttype:'customer',btchashpower:'.'};
      var finaldata =  Object.assign(this.data1,data);
    	this.service.post(UrlConfig.profile.updateuser, finaldata).subscribe((uinfo)=>{
          if(uinfo.id){
        	   this.toastr.success('Updated');
             this.router.navigate(['/Admincustomers']);  
          }
        }, (err) => {
            this.toastr.error(err._body, 'OOPS');
        });
    }
  }
}
