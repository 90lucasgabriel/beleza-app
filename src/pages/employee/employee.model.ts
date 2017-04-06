import { User }     from '../user/user.model';

export interface Employee{
	id?           : number,
	user_id?      : number,
	cpf?          : string,
	cnpj?         : string,
	phone_1?      : string,
	phone_2?      : string,
	address?      : string,
	complement?   : string,
	zipcode?      : string,
	neighborhood? : string,
	city?         : string,
	state?        : string,
	country?      : string,
	user?         : { data: User }
}

export interface BranchJobEmployee{
	employee_id?  : number,
	branch_id?    : number,
	employee?     : { data: Employee }
}
