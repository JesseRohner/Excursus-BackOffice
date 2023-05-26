import {detectiveTypes} from './actions';

const initialState = {
	detectives: [],
	activeDetective: {},
};

export default (state = initialState, action) => {
	switch (action.type) {
	case detectiveTypes.GET_ALL_DETECTIVES.SUCCESS:
		return {
			...state,
			detectives: action.payload,
		};
	case detectiveTypes.GET_DETECTIVE.SUCCESS:
		return {
			...state,
			activeDetective: action.payload,
		};
	case detectiveTypes.EDIT_DETECTIVE.SUCCESS:
		return {
			...state,
			activeDetective: {
				...state.activeDetective,
				detective: action.payload.detective
			},
		};
	default:
		return { ...state };
	}
};
