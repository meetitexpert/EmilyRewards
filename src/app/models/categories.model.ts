export class Categories {
	statusCode?: number
	returnMessage?: string
	returnData? : [catObj]
}

export class catObj {
	categoryId? : string
	level? : string
	categoryIconUrl? : string
	categoryImageURL? : string
	categoryParentId? : string
	categoryParentName? : string
	categoryContentId? : string
	name? : string
	longName? : string
	description? : string
}
