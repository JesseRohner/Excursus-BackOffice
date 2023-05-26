import actionCreator from '../../../utils/actionCreator';

const CustomersActionTypes = [
	'DELETE_CLIENT',
	'GET_ALL_CUSTOMERS',
	'GET_CUSTOMER',
	'CREATE_CUSTOMER',
	'GET_ALL_STORES',
	'GET_STORE',
	'EDIT_STORE',
	'GET_ALL_CHIEFS',
	'EDIT_CUSTOMER',
	'EDIT_CHIEF',
	'CREATE_CHIEF',
	'GET_CHIEF',
	'CREATE_STORE',
	'DELETE_STORE',
	'CREATE_CUSTOMER_DOCUMENT',
	'EDIT_CUSTOMER_DOCUMENT'
];

export const {types: customerTypes, actions: customerActions} = actionCreator(CustomersActionTypes );
