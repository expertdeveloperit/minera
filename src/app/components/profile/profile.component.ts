import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../services/common.service';
import { UrlConfig } from '../../services/urlProviders';
import { FormBuilder, Validators,FormControl} from '@angular/forms';//its using for form
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

import { Headers,RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[CommonService]
})
export class ProfileComponent implements OnInit {

  constructor(private service:CommonService, private router:Router) { }

  ngOnInit() {

    var headers = new Headers();
    /*headers.append('Cookie', "sid="+JSON.parse(localStorage.getItem('user')).id);*/
    headers.append('Content-Type',"application/x-www-form-urlencoded");
    headers.append('Cache-Control',"no-cache");
    headers.append('Access-Control-Allow-Origin', "*");
    headers.append('Access-Control-Allow-Credentials', "true");
    headers.append('mode','cors');
    headers.append('Accept',"*/*");
    var options = new RequestOptions({
      headers : headers,
      withCredentials : true
    });


    this.service.get(UrlConfig.profile.get).subscribe((data) => {
      console.log(data);
    })

  }
  // --Profile Data Save--
  onProfile(info){
  	  this.service.profileData(info).subscribe((data)=>{
  	  	console.log("ok",info);
      });
  }

}
