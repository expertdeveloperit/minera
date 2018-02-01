import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app.routing.module';
import {routingcomponent} from './app.routing.module';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes} from '@angular/router';//its module using for routes
import {DataTableModule} from "angular2-datatable";//DataTable

import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';//Loader
import { ToastrModule } from 'ngx-toastr';//Angular toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//Animatios

import { AppComponent } from './app.component';

//dashboard modules
import { SidebarComponent } from './components/include/sidebar/sidebar.component';
import { HeaderComponent } from './components/include/header/header.component';

//services
import {CommonService} from './services/common.service';
import { DataFilterPipe } from './components/orders/data-filter.pipe';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    routingcomponent,
    SidebarComponent,
    HeaderComponent,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    DataTableModule,
    ToastrModule.forRoot({ // ToastrModule added
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), 
    LoadingModule.forRoot({ // LoadingModule added
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(68, 62, 62, 0.4)', 
      backdropBorderRadius: '0',
      primaryColour: '#000', 
      secondaryColour: '#000', 
    }),
    AppRoutingModule,
    RouterModule.forRoot([]),
  ],

  providers: [CommonService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
