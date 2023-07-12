import { Injectable } from '@angular/core';
import { productObj } from '../models/products.model';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
    public baseUrl = 'https://services-emilyrewards.envisionmobile.com/RLP-Service/'  //'https://services.emilyrewards.com/RLP-Service/'
    public imgBaseUrl = 'https://services-emilyrewards.envisionmobile.com:3471/images/'  //'https://services.emilyrewards.com/RLP-Service/'
    public accessToken = '09b16acba64e1929875605b3c657404e';
    public API_Key = "1f0759a2-ac4c-4ea1-bd3d-49637d1"
    public appVersion = '1.0.0';
    public verificationTokenSendType = "1" //1 or 3 or “”, 1 is  email and 3 is  SMS and “” mean don’t send pin
    public countryCode = "1" //1 for canada, 92 for pakistan
    public catalogType = [1, 2, 3] //3 for gift card,
    public keywordsArray = []
    public appId = "1"
    public shoppingCartItems!: [productObj]

    public termsUrl = 'https://emilyrewards.com/terms'
    public privacyUrl = 'https://emilyrewards.com/privacy'
    public faqUrl = 'https://emilyrewards.com/faq'

    /*Const Values */
    public trackingIdVal = 'trackingId'
    public userObject = 'user'
    public latitude = "43.6666713"
    public longitude = '-79.3157392'


    /*API's */
    public getAppInfo = "getAppInfo.mvc"
    public getTrackingId = "GetTrackingId"
    public forgotpasswrod = 'MemberUserForgotPassword'
    public memberLogin = 'MemberUserLogin'
    public memberSignup = 'MemberUserRegister'
    public sendPinMessage = 'SendVerifyMessageCode'
    public verifyPinCode = 'VerifyMessageCode'
    public getkeywords = 'GetOfferKeywords?'
    public getCategories = 'getCategoryList.mvc'
    public getRecommentedPromotions = 'getPromotionIds.mvc'
    public searchOffersAPi = 'SearchOffers?'
    public getFavouriteRetailer = 'SearchMembershipFavourites'
    public getJournalData = 'getTransactionList.mvc'
    public getProducstsList = 'getProductList.mvc'
    public getProductDetail = 'getProduct.mvc'
    public markFavourite = 'MembershipFavourites'
    public getRetailerSettings = 'GetRetailerSettings.mvc'

    ////////////Colors////////
    public primaryColor = 0xFF02b4ec;


    setCatalogueType() {
        var catalogType = [1, 2, 3]
        let test = encodeURIComponent(JSON.stringify(catalogType))
        console.warn(test)
        return test
    }

    public createRange(number: number) {
        // return new Array(number);
        return new Array(number).fill(0)
            .map((n, index) => index + 1);
    }

    public calculatePercentage(product: productObj) {
        let percentage = ((Number(product.displayPrice) - Number(product.dicountedPrice)) / Number(product.displayPrice)) * 100
        return percentage.toFixed(2)
    }


    btn_addQty_Action(product: productObj) {
        product.offerQuantity += 1
        this.manageShoppingCart(product)
    }

    btn_subtractQty_Action(product: productObj) {
        if (product.offerQuantity > 0) {
            product.offerQuantity -= 1
        }
        this.manageShoppingCart(product)
    }

    public manageShoppingCart(product: productObj) {
        if (this.shoppingCartItems) {//if cart has items
            let indexToUpdate = this.shoppingCartItems?.findIndex(item => item.productId === product.productId);
            if (indexToUpdate >= 0) {
                if (product.offerQuantity > 0) {
                    this.shoppingCartItems[indexToUpdate ?? 0].offerQuantity = product.offerQuantity
                } else {
                    this.shoppingCartItems.splice(indexToUpdate)
                }
            } else {
                this.shoppingCartItems.push(product)
            }
        } else {
            //if cart has no items
            this.shoppingCartItems = [product]
        }

    }

    public getexactTime (time:string) {
        var currentTime = 9;
        
        switch (time) {
            case "12:00 AM": case "12:15 AM": case "12:30 AM": case "12:45 AM":
                currentTime = 0o0;
            break;
        case "01:00 AM": case "01:15 AM": case "01:30 AM": case "01:45 AM":
            currentTime = 1;
            break;
        case "02:00 AM": case "02:15 AM": case "02:30 AM": case "02:45 AM":
            currentTime = 2;
            break;
        case "03:00 AM": case "03:15 AM": case "03:30 AM": case "03:45 AM":
            currentTime = 3;
            break;
        case "04:00 AM": case "04:15 AM": case "04:30 AM": case "04:45 AM":
            currentTime = 4;
            break;
        case "05:00 AM": case "05:15 AM": case "05:30 AM": case "05:45 AM":
            currentTime = 5;
            break;
        case "06:00 AM": case "06:15 AM": case "06:30 AM": case "06:45 AM":
            currentTime = 6;
            break;
        case "07:00 AM": case "07:15 AM": case "07:30 AM": case "07:45 AM":
            currentTime = 7;
            break;
        case "08:00 AM": case "08:15 AM": case "08:30 AM": case "08:45 AM":
            currentTime = 8;
            break;
        case "09:00 AM": case "09:15 AM": case "09:30 AM": case "09:45 AM":
            currentTime = 9;
            break;
        case "10:00 AM": case "10:15 AM": case "10:30 AM": case "10:45 AM":
            currentTime = 10;
            break;
        case "11:00 AM": case "11:15 AM": case "11:30 AM": case "11:45 AM":
            currentTime = 11;
            break;
        case "12:00 PM": case "12:15 PM": case "12:30 PM": case "12:45 PM":
            currentTime = 12;
            break;
        case "01:00 PM": case "01:15 PM": case "01:30 PM": case "01:45 PM":
            currentTime = 13;
            break;
        case "02:00 PM": case "02:15 PM": case "02:30 PM": case "02:45 PM":
            currentTime = 14;
            break;
        case "03:00 PM": case "03:15 PM": case "03:30 PM": case "03:45 PM":
            currentTime = 15;
            break;
        case "04:00 PM": case "04:15 PM": case "04:30 PM": case "04:45 PM":
            currentTime = 16;
            break;
        case "05:00 PM": case "05:15 PM": case "05:30 PM": case "05:45 PM":
            currentTime = 17;
            break;
        case "06:00 PM": case "06:15 PM": case "06:30 PM": case "06:45 PM":
            currentTime = 18;
            break;
        case "07:00 PM": case "07:15 PM": case "07:30 PM": case "07:45 PM":
            currentTime = 19;
            break;
        case "08:00 PM": case "08:15 PM": case "08:30 PM": case "08:45 PM":
            currentTime = 20;
            break;
        case "09:00 PM": case "09:15 PM": case "09:30 PM": case "09:45 PM":
            currentTime = 21;
            break;
        case "10:00 PM": case "10:15 PM": case "10:30 PM": case "10:45 PM":
            currentTime = 22;
            break;
        case "11:00 PM": case "11:15 PM": case "11:30 PM": case "11:45 PM":
            currentTime = 23;
            break;
            
        default:
            break;
        }
        return currentTime;
   }
    
   public getTimeInRequiredFormate (time:string) {
        let currentTime = time;
        let expression = "^0+";
        switch (time) {
        case "01:00 AM": case "01:15 AM": case "01:30 AM": case "01:45 AM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "02:00 AM": case "02:15 AM": case "02:30 AM": case "02:45 AM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "03:00 AM": case "03:15 AM": case "03:30 AM": case "03:45 AM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "04:00 AM": case "04:15 AM": case "04:30 AM": case "04:45 AM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "05:00 AM": case "05:15 AM": case "05:30 AM": case "05:45 AM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "06:00 AM": case "06:15 AM": case "06:30 AM": case "06:45 AM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "07:00 AM": case "07:15 AM": case "07:30 AM": case "07:45 AM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "08:00 AM": case "08:15 AM": case "08:30 AM": case "08:45 AM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "09:00 AM": case "09:15 AM": case "09:30 AM": case "09:45 AM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "01:00 PM": case "01:15 PM": case "01:30 PM": case "01:45 PM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "02:00 PM": case "02:15 PM": case "02:30 PM": case "02:45 PM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "03:00 PM": case "03:15 PM": case "03:30 PM": case "03:45 PM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "04:00 PM": case "04:15 PM": case "04:30 PM": case "04:45 PM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "05:00 PM": case "05:15 PM": case "05:30 PM": case "05:45 PM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "06:00 PM": case "06:15 PM": case "06:30 PM": case "06:45 PM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "07:00 PM": case "07:15 PM": case "07:30 PM": case "07:45 PM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "08:00 PM": case "08:15 PM": case "08:30 PM": case "08:45 PM":
            currentTime = time.replaceAll(expression, "");
            break;
        case "09:00 PM": case "09:15 PM": case "09:30 PM": case "09:45 PM":
            currentTime = time.replaceAll(expression, "");
            break;
            
        default:
            break;
        }
        return currentTime;
   }
}

