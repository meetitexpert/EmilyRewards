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
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { PinValidationComponent } from './auth/pin-validation/pin-validation.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { ProductsScreenComponent } from './appScreens/products-screen/products-screen.component';
import { WalletScreenComponent } from './appScreens/wallet-screen/wallet-screen.component';
import { MoreScreenComponent } from './appScreens/more-screen/more-screen.component';
import { ProductListScreenComponent } from './appScreens/product-list-screen/product-list-screen.component';
import { PromotionsListComponent } from './appScreens/promotions-list/promotions-list.component';
import { JournalComponent } from './appScreens/more-screen/more-sections/journal/journal.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ContactUsComponent } from './appScreens/more-screen/more-sections/contact-us/contact-us.component';
import { OrderDetailComponent } from './appScreens/more-screen/more-sections/order-detail/order-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotPageFoundComponent,
    LandingComponent,
    SignInComponent,
    FooterComponent,
    SignupComponent,
    ForgotpasswordComponent,
    HomeScreenComponent,
    PinValidationComponent,
    ProductsScreenComponent,
    WalletScreenComponent,
    MoreScreenComponent,
    ProductListScreenComponent,
    PromotionsListComponent,
    JournalComponent,
    ContactUsComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground:true,
    }),
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
