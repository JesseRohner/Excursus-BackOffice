import actionCreator from '../../../utils/actionCreator';

const PracticesActionTypes = [
	'GET_PRACTICES',
	'GET_PRACTICES_BY_STATUS',
	'GET_INFO_FOR_PRACTICE_CREATION',
	'GET_CUSTOMER_STORES',
	'ADD_PRACTICE',
	'GET_PRACTICE',
	'EDIT_PRACTICE',
	'DELETE_PRACTICE',
	'CREATE_PRACTICE_DOCUMENT',
	'EDIT_PRACTICE_DOCUMENT'
];

export const {types: practiceTypes, actions: practiceActions} = actionCreator(PracticesActionTypes);
