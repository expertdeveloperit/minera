import { NgModule } from '@angular/core';
import { Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes,Router, CanActivate} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';


import {LoginComponent} from './components/authentication/login/login.component';
import {SignupComponent} from './components/authentication/signup/signup.component';
import {ForgotPasswordComponent} from './components/authentication/forgot-password/forgot-password.component';
import {DashboardComponent} from './components/include/dashboard/dashboard.component';

//home
import {HomeComponent} from './components/home/home.component';
//profile
import {ProfileComponent} from './components/profile/profile.component';
//cashout--
import {CashoutComponent} from './components/cashout/cashout.component';
import {PurchaseEthComponent} from './components/purchase-eth/purchase-eth.component';

//Orders
import {OrdersComponent } from './components/orders/orders.component';
import {SetupOrdersComponent} from './components/setup-orders/setup-orders.component';
import {SetupcustomerComponent} from './components/setupcustomer/setupcustomer.component';
import {BlocksComponent} from './components/Admin/blocks/blocks.component';
import {CustomersComponent} from './components/Admin/customers/customers.component';
import {RewardsComponent} from './components/Admin/rewards/rewards.component';
import {AdminordersComponent} from './components/Admin/adminorders/adminorders.component';

@Injectable()

export class AlwaysAuthGuard implements CanActivate {

  constructor(private router: Router,private _cookieService:CookieService) {}

  public canActivate() {
      let usersData = localStorage.getItem("user");
      if(usersData){
        return true;
      }else{  
        this.router.navigate(['/login']);
        return false;
      } 
  }
}
const appRoutes: Routes = [

                    { path:'',component: HomeComponent },
                    { path:'login',component: LoginComponent },
                    { path:'signup',component:SignupComponent },
                    { path:'forgotPassword',component:ForgotPasswordComponent },
                    { path:"dashboard",component:DashboardComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"profile",component:ProfileComponent,canActivate:[AlwaysAuthGuard] },
                    { path:"cashout",component:CashoutComponent,canActivate:[AlwaysAuthGuard] },
                    { path:"setupOrders",component:SetupOrdersComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"setupcustomer",component:SetupcustomerComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"Adminblocks",component:BlocksComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"Admincustomers",component:CustomersComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"Adminrewards",component:RewardsComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"Adminorders",component:AdminordersComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"cashout/:orderType", component:CashoutComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"orders/btc",  component:OrdersComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"orders/ltc",  component:OrdersComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"orders/eth",  component:OrdersComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"orders/dash",  component:OrdersComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"cashout", component:CashoutComponent,canActivate:[AlwaysAuthGuard]},
                    { path:"purchaseEth",component:PurchaseEthComponent,canActivate:[AlwaysAuthGuard]}
                ];

@NgModule({
   imports: [CommonModule,RouterModule.forChild(appRoutes)],
  declarations: [],
  exports: [ RouterModule ],
  providers: [AlwaysAuthGuard] 
})

export class AppRoutingModule { }
//export routingcomponet class include in module.ts file 

export const routingcomponent =
    [ 
        HomeComponent,
        PurchaseEthComponent,
        LoginComponent,
        SignupComponent,
        ForgotPasswordComponent,
        DashboardComponent,
        ProfileComponent,
        CashoutComponent,
        OrdersComponent,
        SetupOrdersComponent,
        SetupcustomerComponent,
        BlocksComponent,
        CustomersComponent,
        RewardsComponent,
        AdminordersComponent
]