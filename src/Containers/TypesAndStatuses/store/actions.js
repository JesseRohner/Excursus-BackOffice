import actionCreator from '../../../utils/actionCreator';

const StatusesActionTypes = [
	'GET_ALL_STATUSES',
	'GET_DOCUMENT_TYPES',
	'GET_PRACTICES_TYPES',
	'CREATE_PRACTICE_TYPE',
	'EDIT_PRACTICE_TYPE',
	'DELETE_PRACTICE_TYPE',
];

export const {types: statusesTypes, actions: statusesActions} = actionCreator( StatusesActionTypes );
