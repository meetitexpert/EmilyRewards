import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PinValidationComponent } from './auth/pin-validation/pin-validation.component';
import { ProductsScreenComponent } from './appScreens/products-screen/products-screen.component';
import { MoreScreenComponent } from './appScreens/more-screen/more-screen.component';
import { WalletScreenComponent } from './appScreens/wallet-screen/wallet-screen.component';
import { ProductListScreenComponent } from './appScreens/product-list-screen/product-list-screen.component';
import { PromotionsListComponent } from './appScreens/promotions-list/promotions-list.component';
import { JournalComponent } from './appScreens/more-screen/more-sections/journal/journal.component';
import { ContactUsComponent } from './appScreens/more-screen/more-sections/contact-us/contact-us.component';
import { OrderDetailComponent } from './appScreens/more-screen/more-sections/order-detail/order-detail.component';


const routes: Routes = [
  {
    path:'',
    component:LandingComponent
  },
  {
    path:'auth-sign-in',
    component:SignInComponent
  },
  {
    path:'auth-sign-up',
    component:SignupComponent
  },
  {
    path:'pin-validation',
    component:PinValidationComponent
  },
  {
    path:'auth-forgot',
    component:ForgotpasswordComponent
  },
  {
    path:'home-screen',
    component:HomeScreenComponent
  },
  {
    path:'product-screen',
    component:ProductsScreenComponent
  },
  {
    path:'wallet-screen',
    component:WalletScreenComponent
  },
  {
    path:'more-screen',
    component:MoreScreenComponent
  },
  {
    path:'product-list',
    component:ProductListScreenComponent
  },
  {
    path:'promotions-list',
    component:PromotionsListComponent
  },
  {
    path:'more-screen/journal-list',
    component:JournalComponent
  },
  {
    path:'more-screen/order-detail',
    component:OrderDetailComponent,
  },
  {
    path:'more-screen/contact-us',
    component:ContactUsComponent
  },
  {
    path:'**',
    component: NotPageFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
