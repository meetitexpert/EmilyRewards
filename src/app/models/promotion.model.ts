export class Promotion {
	statusCode?: number
	returnMessage?: string
	returnData? : [promotionObj]
}

export class PromotionOffers{
    status?: number
	message?: string
    server_timestamp? : string
    page? : 0
    offers? : [promotionObj]
}

export class promotionObj{
	promotionId : number = 0
    cbType : string = ""
    customCard : string = ""
    discountValue : number = 0
    endDate : string = ""
    exclusivity : string = ""
    includedProducts : string = ""
    longDescription : string = ""
    promotionCode : string = ""
    promotionType : string = ""
    redeemTC : string = ""
    restrictionTC : string = ""
    rewardsTC : string = ""
    shortDescription : string = ""
    startDate : string = ""
    startDateEffective : number = 0
    status : string = ""
    userType : string = ""
    favourite : string = ""
    cashBackDiscountValue : string = ""
    offerId : string = ""
    partnerDescription : string | undefined = ""
    partnerId : string = ""
    retailerId : string = ""
    partnerImage : string = ""
    partnerName : string = ""
    partnerWebsite : string = ""
    partnerPhoneNo : string = ""
    pointRedeemVal : string = ""
    pointVal : string = ""
    pointPurchaseVal : string = ""
    promotionCustomCard : string = ""
    promotionExclusivity : string = ""
    promotionRedeemTC : string = ""
    promotionRestrictionTC : string = ""
    promotionRewardsTC : string = ""
    promotionUserType : string = ""
    stampFrequency : string = ""
    stampNumOfStamps : string = ""
    stampTimeLimit : string = ""
    startingDateEffective : string = ""
    latitude : string = ""
    longitude : string = ""
    address : string = ""
    unit : string = ""
    state : string = ""
    country : string = ""
    street : string = ""
    city : string = ""
    postalCode : string = ""
    locations = []
    userStampNumber : number = 0
    partnerRewardsTC : string = ""
    locationId : string = ""
    catalogId : string = ""
    giftCardCount : number = 0
    retailerLogo : string = ""
    
    totalRatingUser : number = 0
    currentRating : string = "0"
    userRatingNumber : number = 0
    rating1Times : number = 0
    rating2Times : number = 0
    rating3Times : number = 0
    rating4Times : number = 0
    rating5Times : number = 0
    
    userCashBack : string = ""
    userPoint : string = ""
    conversionVal : number = 0

    earnStamps : string = ""
    redeemStamps : string = ""
    earnPoints  : string = ""
    redeemPoints : string = ""
    earnRate : string = ""
    redeemRate : string = ""
    redeemValue : string = ""
    transactionAmount : string = ""
    timeLimit : string = ""
    frequency : string = ""
    userRewardCount : string = ""
    totalTransactionPerday : string = "0"
    lastTrasactionTime: string = ""
    
    shippingRadius: string = ""
    deliveryType: string = ""
    distance : string = ""
    erpType: string = ""
    
    sun_open_status: string = ""
    sun_start_time: string = ""
    sun_end_time: string = ""
    mon_open_status: string = ""
    mon_start_time : string = ""
    mon_end_time : string = ""
    tue_open_status: string = ""
    tue_start_time : string = ""
    tue_end_time : string = ""
    wed_open_status : string = ""
    wed_start_time : string = ""
    wed_end_time : string = ""
    thu_open_status : string = ""
    thu_start_time : string = ""
    thu_end_time : string = ""
    fri_open_status : string = ""
    fri_start_time : string = ""
    fri_end_time : string = ""
    sat_open_status : string = ""
    sat_start_time : string = ""
    sat_end_time : string = ""
    
    //coupon detail
    couponId : string = ""
    couponRate : string = ""
    couponImageURL : string = ""
    couponCode : string = ""
    couponDescription : string = ""
    couponType : string = ""
    couponIsUsed : boolean = false
    couponTC : string = ""
}