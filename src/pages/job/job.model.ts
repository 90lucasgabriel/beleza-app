export interface BranchJob{
	id			: number,
	branch_id   : number,
	price       : number,
	description : string,
	images      : {
		data    : Array<JobImage>
	},
	created_at  : Object,
	updated_at  : Object
}


export interface Job{
	id			: number,
	name        : string,
	price       : number,
	description : string,
	images      : {
		data    : Array<JobImage>
	},
	created_at  : Object,
	updated_at  : Object
}


export interface JobImage{
	id          : number,
	url         : string,
	description : string,
	index       : number,
	created_at  : Object,
	updated_at  : Object
}
