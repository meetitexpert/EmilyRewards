import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConstants {
    public baseUrl =  'https://services.envisionmobile.com/RLP-Service/'  //'https://services.emilyrewards.com/RLP-Service/'
    public accessToken = '09b16acba64e1929875605b3c657404e';
    public API_Key = "1f0759a2-ac4c-4ea1-bd3d-49637d1"
    public appVersion = '1.0.0';
    public verificationTokenSendType = "1" //1 or 3 or “”, 1 is  email and 3 is  SMS and “” mean don’t send pin
    public countryCode = "1" //1 for canada, 92 for pakistan
    public catalogType = [1, 2, 3] //3 for gift card,
    public keywordsArray = []
    public appId = "1"

    public termsUrl = 'https://emilyrewards.com/terms'
    public privacyUrl = 'https://emilyrewards.com/privacy'
    public faqUrl = 'https://emilyrewards.com/faq'

    /*Const Values */
    public trackingIdVal = 'trackingId'
    public userObject = 'user'


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
    public getFavouriteRetailer = 'SearchMembershipFavourites'


    setCatalogueType() {
        var catalogType = [1, 2, 3]
        return catalogType
    }
}