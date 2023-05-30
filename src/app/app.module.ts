import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotPageFoundComponent,
    LandingComponent,
    SignInComponent,
    FooterComponent,
    SignupComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
