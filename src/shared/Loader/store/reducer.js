import * as constants from './constants';

const initialState = {
	loading: 0,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case constants.START_LOADER:
		return {
			...state,
			loading: state.loading + 1
		};
	case constants.STOP_LOADER:
		return {
			...state,
			loading: state.loading - 1
		};
	default:
		return { ...state };
	}
};

export { reducer as LoaderReducer };
