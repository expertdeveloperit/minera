import { Component, OnInit } from '@angular/core';
import { UrlConfig } from '../../../services/urlProviders';
import {CommonService} from '../../../services/common.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';//Toastr Service
import { CookieService } from 'ngx-cookie-service';
import { Headers,RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:CommonService,private router:Router,private toastr: ToastrService, private cookie: CookieService) { }

  ngOnInit() {
  }

  login(userData){
  	this.service.post(UrlConfig.users.login, userData).subscribe((data) => {
      console.log(data,"data");
  		if(data.path){
        this.cookie.set('sid', data.id);
        localStorage.setItem('user', JSON.stringify(data));
        this.toastr.success('You have successfully logged in.', 'Congratulations');
  			this.router.navigate(['dashboard']);
  		}
  	}, (err) => {
        this.toastr.error(err._body, 'OOPS');
    });
  }
}
