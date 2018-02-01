import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';//Toastr Service
declare var $: any; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  	$("body").addClass("home");
  }

  ngOnDestroy(){
  	$("body").removeClass("home");	
  }
  onSubmit(data){
    console.log("ok",data);
    this.toastr.success('Thanks for filling out form!', 'Congratulations');
    $('#contact_form')[0].reset();
  }
}
