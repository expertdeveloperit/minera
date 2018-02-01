import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { UrlConfig } from '../../../services/urlProviders';
import { environment } from '../../../../environments/environment';

//set headers
import { Headers,RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  notification_messages="";
  constructor(private service:CommonService) { }

  ngOnInit() {
  }

  forgotPassword(username){
    console.log(username,'entered name');
    this.service.forgotPassword("http://localhost/forgotPassword/process_forgot.php?username=" + username.username).subscribe((data) => {
      this.notification_messages = data;
      },(err) => {
        // notification here
        console.log(err,'err');
      });
  }

}
