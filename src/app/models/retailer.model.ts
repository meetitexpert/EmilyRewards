export class Retailer {
	message? : string
	offers? : [retailerObj]
	pages? : 0
	status? : string
}

export class retailerObj {
	address? : string = ""
    locationId : string = ""
    unit : string = ""
    state : string = ""
    country : string = ""
    street : string = ""
    city : string = ""
    postalCode : string = ""
    locationsArray = []
    buttonLabel : string = ""
    categoryCode : string = ""
    dataType : string = ""
    favourite : string = ""
    latitude : string = ""
    longitude : string = ""
    offerDescription : string = ""
    offerEndDate : string = ""
    offerId : string = ""
    offerImageBackUrl : string = ""
    offerImageFrontUrl : string = ""
    offerShortDescription : string = ""
    offerStartDate : string = ""
    offerType  = []
    offerUrl : string = ""
    partnerClass : string = ""
    partnerDescription : string = ""
    partnerImage : string = ""
    partnerName : string = ""
    partnerWebsite : string = ""
    phoneNumber : string = ""
    phoneType : string = ""
//    redeemValue : number = 0
    rewardPoints : number = 0
    rewardsValue : number = 0
    urlSuffix : string = ""
    partnerID : string = ""
    storeLocationID: string = ""
    restriction : string = ""
    transaction_type : string = ""
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
    shippingRadius: string = ""
    deliveryType: string = ""
    distance : string = ""
    
    transactionCount : string = ""
    transactionLastDate : string = ""
    rules = [Rule]
    
    promotionType : string  = ""
    cashBackDiscountValue : string = ""
    pointVal : string = ""
    pointPurchaseVal : string = ""
    stampNumOfStamps : string = ""
    userStampNumber : number = 0
    userCashBack : string = ""
    userPoint : number = 0
    
    totalRatingUser : number = 0
    currentRating : string = "0"
    userRatingNumber : number = 0
    rating1Times : number  = 0
    rating2Times : number  = 0
    rating3Times : number = 0
    rating4Times : number = 0
    rating5Times : number = 0
    
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
    rewardsRedeemTC : string = ""
    rewardsRewardsTC : string = "" 
}

class Rule {
	 ruleCode? : String
	 ruleValue? : String
}
