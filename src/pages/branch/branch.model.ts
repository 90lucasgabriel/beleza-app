export interface Branch{
	id			         : number,
	address       : string,
	city          : string,
	phone         : string,
	state         : string,
	zipcode       : string,
	image         : string,
	created_at    : Object,
	updated_at    : Object,
	
	establishment : {data: BranchDetails},	
	images        : {data: Array<BranchImage>},
}

export interface BranchDetails{
	id          : number,
	name        : string,
	description : string,
	image       : string
}

export interface BranchImage{
	id          : number,
	url         : string,
	description : string,
	index       : number,
	created_at  : Object,
	updated_at  : Object
}
