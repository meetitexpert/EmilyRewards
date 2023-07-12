import { Component } from '@angular/core';
import { AppConstants } from 'src/app/Constants/app.constants';
import { productObj } from 'src/app/models/products.model';
import { promotionObj } from 'src/app/models/promotion.model';
import { RetailerSettings } from 'src/app/models/retailer-settings.model';
import { SingIn } from 'src/app/models/sing-in.model';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  promotion?:promotionObj
  user?:SingIn
  productslist? : [productObj]
  retailerSettings? : RetailerSettings
  
  constructor(public constants:AppConstants, private apiService:ApisService){
    this.productslist = constants.shoppingCartItems
    this.promotion = this.productslist[0].promotion
    this.user = JSON.parse(sessionStorage.getItem(constants.userObject) ?? "") as SingIn
  }

  ngOnInit(){
    this.getRetailerDetail()
  }

  calculateProductTotal(prod:productObj){
    let productTotalprice = 0
    if(prod.dicountedPrice != "0.00"){
      productTotalprice = prod.offerQuantity * Number(prod.dicountedPrice)
    }else{
      productTotalprice = prod.offerQuantity * Number(prod.displayPrice)
    }
    return productTotalprice
  }

  getRetailerDetail(){
    let params = new Map(Object.entries({
      "type":"M",
      "userId":this.user?.user_id?.toString(),
      "retailerId":this.promotion?.partnerId,
      "version":"1",
      "clientClass":"2"
    }))
    this.apiService.post(this.constants.getRetailerSettings, params).subscribe((result)=>{
      console.warn(result)
      this.retailerSettings = result as RetailerSettings
      this.retailerSettings.gratuity = this.retailerSettings.returnData!['settings'].filter((item) =>item['name']=='isAcceptGratuity')[0];
      this.retailerSettings.standardShippingCost = this.retailerSettings.returnData!['settings'].filter((item) =>item['name']=='standardShippingCost')[0];
      this.retailerSettings.freeShippingCost = this.retailerSettings.returnData!['settings'].filter((item) =>item['name']=='freeShippingAmount')[0];
      this.retailerSettings.cashDiscount = this.retailerSettings.returnData!['settings'].filter((item) =>item['name']=='cashDiscount')[0];
      this.retailerSettings.payMethods = this.retailerSettings.returnData!['settings'].filter((item) =>item['name']=='payMethods')[0];
    })
  }
}
