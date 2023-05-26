import actionCreator from '../../../utils/actionCreator';

const SignInActionTypes = [
	'SIGN_IN', 'FETCH_USER', 'LOG_OUT'
];

export const {types, actions} = actionCreator( SignInActionTypes );
