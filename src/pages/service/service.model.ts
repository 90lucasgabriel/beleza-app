export interface BranchJob{
	id			: number,
	branch_id   : number,
	price       : number,
	description : string,
	images      : {
		data    : Array<ServiceImage>
	},
	created_at  : Object,
	updated_at  : Object
}


export interface Service{
	id			: number,
	name        : string,
	price       : number,
	description : string,
	images      : {
		data    : Array<ServiceImage>
	},
	created_at  : Object,
	updated_at  : Object
}


export interface ServiceImage{
	id          : number,
	url         : string,
	description : string,
	index       : number,
	created_at  : Object,
	updated_at  : Object
}
