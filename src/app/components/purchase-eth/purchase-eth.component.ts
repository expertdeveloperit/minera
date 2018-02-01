import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';//Toastr Service
declare var $: any; 

@Component({
  selector: 'app-purchase-eth',
  templateUrl: './purchase-eth.component.html',
  styleUrls: ['./purchase-eth.component.css','./../home/home.component.css']
})
export class PurchaseEthComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }
  onSubmit(data){
    console.log("ok",data);
    this.toastr.success('Thanks for filling out form!', 'Congratulations');
    $('#contact_form')[0].reset();
  }

  ngAfterViewInit(){
  	$('html,body').scrollTop(0);	
  }
  submitMe(){
    $("#SubmitMe").submit();
  }
}
