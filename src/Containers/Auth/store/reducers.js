import {types} from './actions';

const initialState = {
	error: null,
	user: {},
	token: null,
	isLogin: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
	case types.SIGN_IN.REQUEST:
		return {
			...state,
			error: null,
		};
	case types.SIGN_IN.FAILED:
		return {
			...state,
			loading: false,
			error: action.payload,
		};
	case types.FETCH_USER.SUCCESS:
		return {
			...state,
			user: action.payload,
			loading: false,
			error: null,
		};
	case types.SIGN_IN.SUCCESS:
		return {
			...state,
			user: action.payload.data,
			token: action.payload.token,
			error: null,
			loading: false,
			isLogin: true,
		};
	case types.LOG_OUT.SUCCESS:
		return {
			...state,
			error: null,
			isLogin: false,
			user: {}
		};
	default:
		return { ...state };
	}
};
