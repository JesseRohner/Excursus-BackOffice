import actionCreator from '../../../utils/actionCreator';

const DetectivesActionTypes = [
	'DELETE_CLIENT',
	'GET_ALL_DETECTIVES',
	'GET_DETECTIVE',
	'CREATE_DETECTIVE',
	'EDIT_DETECTIVE',
];

export const {types: detectiveTypes, actions: detectiveActions} = actionCreator(DetectivesActionTypes );
