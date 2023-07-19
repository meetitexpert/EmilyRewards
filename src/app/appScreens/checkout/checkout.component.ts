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
  
  totalBeforeTax = 0
  //credits handling
  redeemTotalCashPointStampVal = 0
  creditAppleidTime = 1
  redeemEnable : boolean = false

  //cashApply varibale
  isCashApplied = false

  //store coupon variabel
  storeCouponValue = '';

  //gits variable
  appliedGiftsArray = []  
  
  //Order type variable
  orderTypeDeliveryOrPickup = 'pickup'


  constructor(public constants:AppConstants, private apiService:ApisService){
    this.productslist = constants.shoppingCartItems
    this.promotion = this.productslist[0].promotion
    this.calculateTotalBeforeTax()
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

  calculateTotalBeforeTax(){
    this.totalBeforeTax = 0
    for (let prod of this.productslist!){
      if(prod.dicountedPrice != "0.00"){
        this.totalBeforeTax = this.totalBeforeTax + (prod.offerQuantity * Number(prod.dicountedPrice))
      }else{
        this.totalBeforeTax = this.totalBeforeTax + (prod.offerQuantity * Number(prod.displayPrice))
      }
    }
  }

  getRetailerDetail(){
    let params = new Map(Object.entries({
      "type":"M",
      "userId":this.user?.user_id?.toString(),
      "retailerId":this.promotion?.partnerId ?? this.promotion?.retailerId,
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

  //QUANTITY HANDLING
  addQtyHandling(prod:productObj, isAdd:boolean){
    if(isAdd){
      this.constants.btn_addQty_Action(prod)
    }else{
      this.constants.btn_subtractQty_Action(prod)
    }
    this.calculateProductTotal(prod)
    this.calculateTotalBeforeTax()
    this.isRedeemEnable()
  }


  //Redeem settings
  isRedeemAvailable(){
    this.isRedeemEnable()
    if(Number(this.promotion?.userRewardCount)>0){
      return true
    }else{
      return false
    }
  }

  isRedeemEnable(){
    if(Number(this.promotion?.redeemValue) <= this.totalBeforeTax){
      this.redeemEnable = true
    }else{
      this.redeemEnable = false
    } 
  }

  redeemLableTextSetting(){
    let redeemLableText= ''
    if(this.promotion?.promotionType == '1'){//stamps
      if(Number(this.promotion.userRewardCount) > Number(this.promotion.redeemStamps)){
        redeemLableText = "You have "+ this.promotion.userRewardCount + " stamps.\nGet "+ this.promotion.redeemValue +" for " + this.promotion.redeemStamps + " stamps."
        this.redeemTotalCashPointStampVal = Number(this.promotion.redeemStamps) * this.creditAppleidTime
      }
    }else if(this.promotion?.promotionType == '2'){//points
      if(Number(this.promotion.userRewardCount) > Number(this.promotion.redeemPoints)){
        redeemLableText = "You have "+ this.promotion.userRewardCount + " points.\nGet $"+ this.promotion.redeemValue +" for " + this.promotion.redeemPoints + " points."
        this.redeemTotalCashPointStampVal = Number(this.promotion.redeemPoints) * this.creditAppleidTime
      }
    }else if(this.promotion?.promotionType == '3'){//cashback
      if(Number(this.promotion.userRewardCount) > Number(this.promotion.redeemRate)){
        if(Number(this.promotion.redeemRate) > Number(this.promotion?.redeemValue)){
          redeemLableText = "You have $"+ Number(this.promotion.userRewardCount).toFixed(2) + " cashback.\nGet $"+ Number(this.promotion.redeemValue).toFixed(2) + " cashback."
        }else{
          redeemLableText = "You have $"+ Number(this.promotion.userRewardCount).toFixed(2) + " cashback.\nGet $"+ this.promotion.redeemValue +" for " + this.promotion.redeemRate + " cashback."
        }
        
        this.redeemTotalCashPointStampVal = Number(this.promotion.userRewardCount) * this.creditAppleidTime
      }
    }

    return redeemLableText
  }

  btn_redeem_action(){
    
  }

  //Gratuity Settings
  isGratuityAvaialble(){
    if(this.retailerSettings?.gratuity?.value == '1'){
      return true
    }
    return false
  }
  gratuitySetting(){

  }

  //cashdiscount handling 
  isCashDiscountAvailable(){
    if(Number(this.retailerSettings?.cashDiscount?.value) > 0){
      return true
    }
    return false
  }

  btn_cashApply_Action(){
    this.isCashApplied = !this.isCashApplied
  }

  //coupon handling
  onKeyCouponfield(event: any) { 
    this.storeCouponValue += event.target.value;
    console.warn(this.storeCouponValue) 
  }

  //address handling
  onKeyAddressfield(event: any) { 
    this.storeCouponValue += event.target.value;
    console.warn(this.storeCouponValue) 
  }

  orderTypeSetting(type:string){
    this.orderTypeDeliveryOrPickup = type
  }

  btn_proceedCheckOut_Action(){

  }

}
