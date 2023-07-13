export class RetailerSettings {
	returnData?: { settings: [] }
	returnMessage?: string
	statusCode?: 0

	//gratuity settings 
	gratuity? = {name:'', value:''}
	standardShippingCost? = {name:'', value:''}
	freeShippingCost? = {name:'', value:''}
	cashDiscount? = {name:'', value:''}
	payMethods? = {name:'', value:''}

}
