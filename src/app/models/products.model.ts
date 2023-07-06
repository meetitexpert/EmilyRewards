import { promotionObj } from "./promotion.model"

export class Products {
	productsList : productObj[] = []
}


export class productObj {
	categoryIconUrl?: String
	categoryId?: number
	categoryName?: String
	categoryParentId?: number
	descriptionField?: String
	dicountedPrice?: String
	displayPrice?: String
	favourite?: String
	inventory?: number
	logoUrl?: String
	productId?: number
	productName?: String
	productType?: String
	restrictionTC?: String
	sku?: String
	offerQuantity: number = 0
	isGiftCardSelectForSwap?: Boolean = false
	promotion?: promotionObj
	productModelId?: number = 0
	attributes?  : Attributes[] = []
	images : string[] = []
	variations = []
	appliedVariation = {}
}

export class Attributes{
	id? : number
     name? : String
     type? : String
     valueType? : String
     selectionType? : String
     mandatory? : boolean = false
     variation? : boolean = false
     defaultValue? : String
     values? : string[]  = []
     multiValuedAttributeId? : number
}