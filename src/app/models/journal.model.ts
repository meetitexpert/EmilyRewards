export class Journal {
	/*
	{"statusCode":0,"returnMessage":"Success.","returnData":{"datas":[{"serverUUID":"17951678989338","transactionDate":"Mar 16 2023","transactionTime":"03:55 PM","transactionDateTime":"Mar 16, 2023 at 03:55 PM","transactionTimeStamp":"20230316155537000","transactionClass":"2","transactionRewardType":"202","transactionRewardValue":"300","partnerName":"Retailer11 Envision","partnerImage":"https://services.emilyrewards.com/RLP-IMG/images/Logo/e054d850-032a-42f3-9445-a493dd91a9b6-1670422834960.png","shortAddress":"8 King Street East, Toronto","phoneNumber":"4167222442","receiverName":"Bilal Hussain","buyerName":"Bilal Hussain","cardImageUrl":"","oldCardImageUrl":"","oldCardName":"","oldCardDescription":"","cardName":"","cardDescription":"","cardLastPrice":0,"cardDisplayPrice":0,"catalogs":[{"catalogId":774,"purchaseQuantity":2,"totalAmount":30,"totalTaxes":0,"dicountedPrice":15,"displayPrice":16.9,"catalogName":"Soothing Mineral Bath Soak","catalogImageUrl":"https://services-emilyrewards.envisionmobile.com:3471/images/165847173508523429-2","attributes":[]}],"transactionNumber":"1795-1678964137377","transactionAmountExclusiveTax":"28.50","transactionTaxAmount":"3.90","payNo":"","payTime":"2023-03-16 15:55:37","payCardName":"","payCardNumber":"","payType":"3","creditAppliedAmount":"30.00","redeemQuantity":"3000","redeemRate":"3000","redeemValue":"30.00","expressData":{"expressId":2376,"expressNumber":"","expressType":"1","userAddress":"","userComment":"N/A","estimatedDeliveryTime":"","retailerComment":"","acceptTime":"","readyDeliveryTime":"","deliveryTime":"","receiveTime":"","estimatedReadyTime":""},"couponData":[],"couponAppliedAmount":"0.00","gratuity":"0.60","gratuityPercentage":"4","freeShippingAmount":"0.00","standardShippingCost":"0.00","cashDiscountAmount":"1.50","cashDiscountPercentage":"10","transactionTotalAmount":"3.00","giftCardsAppliedValue":"0.00"},{"serverUUID":"17951677699696","transactionDate":"Mar 01 2023","transactionTime":"04:41 PM","transactionDateTime":"Mar 01, 2023 at 04:41 PM","transactionTimeStamp":"20230301164135000","transactionClass":"1","transactionRewardType":"202","transactionRewardValue":"890","partnerName":"Retailer11 Envision","partnerImage":"https://services.emilyrewards.com/RLP-IMG/images/Logo/e054d850-032a-42f3-9445-a493dd91a9b6-1670422834960.png","shortAddress":"8 King Street East, Toronto","phoneNumber":"4167222442","receiverName":"Bilal Hussain","buyerName":"Bilal Hussain","cardImageUrl":"","oldCardImageUrl":"","oldCardName":"","oldCardDescription":"","cardName":"","cardDescription":"","cardLastPrice":0,"cardDisplayPrice":0,"catalogs":[{"catalogId":805,"purchaseQuantity":1,"totalAmount":8.9,"totalTaxes":0,"dicountedPrice":0,"displayPrice":8.9,"catalogName":"Moringa Lively Lip Scrub","catalogImageUrl":"https://services-emilyrewards.envisionmobile.com:3471/images/166327062299181685-2","attributes":[]}],"transactionNumber":"1795-1677670895844","transactionAmountExclusiveTax":"8.90","transactionTaxAmount":"1.16","payNo":"","payTime":"2023-03-01 16:41:35","payCardName":"","payCardNumber":"","payType":"3","creditAppliedAmount":"0.00","expressData":{"expressId":2375,"expressNumber":"","expressType":"1","userAddress":"","userComment":"N/A","estimatedDeliveryTime":"","retailerComment":"","acceptTime":"","readyDeliveryTime":"","deliveryTime":"","receiveTime":"","estimatedReadyTime":""},"couponData":[],"couponAppliedAmount":"0.00","gratuity":"0.00","gratuityPercentage":"0","freeShippingAmount":"0.00","standardShippingCost":"0.00","cashDiscountAmount":"0.00","cashDiscountPercentage":"10","transactionTotalAmount":"10.06","giftCardsAppliedValue":"0.00"},{"serverUUID":"17951677699333","transactionDate":"Mar 01 2023","transactionTime":"04:35 PM","transactionDateTime":"Mar 01, 2023 at 04:35 PM","transactionTimeStamp":"20230301163532000","transactionClass":"1","transactionRewardType":"202","transactionRewardValue":"890","partnerName":"Retailer11 Envision","partnerImage":"https://services.emilyrewards.com/RLP-IMG/images/Logo/e054d850-032a-42f3-9445-a493dd91a9b6-1670422834960.png","shortAddress":"8 King Street East, Toronto","phoneNumber":"4167222442","receiverName":"Bilal Hussain","buyerName":"Bilal Hussain","cardImageUrl":"","oldCardImageUrl":"","oldCardName":"","oldCardDescription":"","cardName":"","cardDescription":"","cardLastPrice":0,"cardDisplayPrice":0,"catalogs":[{"catalogId":805,"purchaseQuantity":1,"totalAmount":8.9,"totalTaxes":0,"dicountedPrice":0,"displayPrice":8.9,"catalogName":"Moringa Lively Lip Scrub","catalogImageUrl":"https://services-emilyrewards.envisionmobile.com:3471/images/166327062299181685-2","attributes":[]}],"transactionNumber":"1795-1677670532529","transactionAmountExclusiveTax":"8.90","transactionTaxAmount":"1.16","payNo":"","payTime":"2023-03-01 16:35:32","payCardName":"","payCardNumber":"","payType":"3","creditAppliedAmount":"0.00","expressData":{"expressId":2374,"expressNumber":"","expressType":"1","userAddress":"","userComment":"N/A","estimatedDeliveryTime":"","retailerComment":"","acceptTime":"","readyDeliveryTime":"","deliveryTime":"","receiveTime":"","estimatedReadyTime":""},"couponData":[],"couponAppliedAmount":"0.00","gratuity":"0.00","gratuityPercentage":"0","freeShippingAmount":"0.00","standardShippingCost":"0.00","cashDiscountAmount":"0.00","cashDiscountPercentage":"10","transactionTotalAmount":"10.06","giftCardsAppliedValue":"0.00"}],"preDate":"202301","nextDate":""}}
	 */
	statusCode?: number
	returnMessage?: string
	returnData?: { "datas": [journalObj] }
	preDate?: string
	nextDate?: string
}

export class journalObj {
	serverUUID?: string 
	transactionDate? : string 
	transactionTime? : string 
	transactionDateTime? : string 
	transactionTimeStamp?: string 
	transactionClass? : string 
	transactionRewardType?: string 
	transactionRewardValue?: string
	partnerName?: string 
	partnerImage?: string 
	shortAddress?: string
	phoneNumber?: string
	receiverName?: string
	buyerName?: string
	cardImageUrl?: string 
	oldCardImageUrl?: string 
	oldCardName?: string 
	oldCardDescription?: string
	cardName?: string
	cardDescription?: string 
	cardLastPrice?: number 
	cardDisplayPrice?: number 
	catalogs?: [{ "catalogId": 0, "purchaseQuantity": 0, "totalAmount": 0, "totalTaxes": 0, "dicountedPrice": 0, "displayPrice": 0, "catalogName": "Soothing Mineral Bath Soak", "catalogImageUrl": "", "attributes": [] }]
	transactionNumber?: string
	transactionAmountExclusiveTax?: string
	transactionTaxAmount?: string
	payNo?: string
	payTime?: string
	payCardName?: string
	payCardNumber?: string
	payType?: string 
	creditAppliedAmount?: string
	redeemQuantity?: string
	redeemRate?: string 
	redeemValue?: string
	expressData ?: { "expressId": "", "expressNumber": "", "expressType": "", "userAddress": "", "userComment": "", "estimatedDeliveryTime": "", "retailerComment": "", "acceptTime": "", "readyDeliveryTime": "", "deliveryTime": "", "receiveTime": "", "estimatedReadyTime": "" } 
	couponData? : [] 
	couponAppliedAmount?: string
	gratuity?: string 
	gratuityPercentage?: string 
	freeShippingAmount?: string
	standardShippingCost? : string
	cashDiscountAmount?: string 
	cashDiscountPercentage?: string
	transactionTotalAmount? : string 
	giftCardsAppliedValue ?: string
	orderNo? : String
    orderItemsTotalPrice? : String
    ordertotalBeforeTax? : String
    orderTotalTax? : String
    orderTotalPrice? : String
    orderReferenceNo? : String
    orderReceiptNo? : String
    orderRdeemValue?  : String
    creditApplied? : String
    paymentCardNo? : String
    paymentCardName? : String
    couponAppliedValue? : String
    couponCode? : String
    appliedCouponsArray? : []
	payByCardORCash? : string
}
