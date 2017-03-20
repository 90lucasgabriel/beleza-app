export interface Establishment{
	id			: number,
	address     : string,
	city        : string,
	phone       : string,
	state       : string,
	zipcode     : string,
	establishment: EstablishmentDetails,
	
	image       : string,
	images      : {
		data    : Array<EstablishmentImage>
	},
	created_at  : Object,
	updated_at  : Object
}

export interface EstablishmentDetails{
	id: number,
	name: string,
	description: string,
	image: string
}

export interface EstablishmentImage{
	id          : number,
	url         : string,
	description : string,
	index       : number,
	created_at  : Object,
	updated_at  : Object
}
