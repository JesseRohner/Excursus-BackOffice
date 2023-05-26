import * as constants from './constants';

const initialState = {
	error: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case constants.SET_ERROR:
		return {
			error: action.payload
		};
	case constants.CLEAR_ERROR:
		return {
			error: null
		};
	default:
		return { ...state };
	}
};

export { reducer as errorReducer };
