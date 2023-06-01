import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { LandingComponent } from './landing/landing.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PinValidationComponent } from './auth/pin-validation/pin-validation.component';

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
    path:'**',
    component: NotPageFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
