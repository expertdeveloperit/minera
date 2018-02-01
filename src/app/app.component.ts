import { Component,Compiler } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app'; public authStatus = false;
   constructor(private location: Location, private router: Router, public compiler: Compiler) {
    this.compiler.clearCache();
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.modifyHeader(event);
    });
  }

  modifyHeader(location) {
    if (location.url != "/login" && location.url != "/forgotPassword" && location.url != '/' && location.url!="/purchaseEth" && location.url != "/signup") {
      this.authStatus = true;
    } else {
      this.authStatus = false;
    }
}

}
