export interface Establishment{
	id			: number,
	name        : string,
	description : string,
	image       : string,
	images      : {
		data    : Array<EstablishmentImage>
	},
	created_at  : Object,
	updated_at  : Object
}


export interface EstablishmentImage{
	id          : number,
	url         : string,
	description : string,
	index       : number,
	created_at  : Object,
	updated_at  : Object
}
