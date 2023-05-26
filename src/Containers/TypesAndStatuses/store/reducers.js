import {statusesTypes} from './actions';

const initialState = {
	allStatuses: [],
	practiceTypes: [],
	documentTypes: []
};

export default (state = initialState, action) => {
	switch (action.type) {
	case statusesTypes.GET_ALL_STATUSES.SUCCESS:
		return {
			...state,
			allStatuses: action.payload,
		};
	case statusesTypes.GET_DOCUMENT_TYPES.SUCCESS:
		return {
			...state,
			documentTypes: action.payload,
		};
	case statusesTypes.GET_PRACTICES_TYPES.SUCCESS:
		return {
			...state,
			practiceTypes: action.payload,
		};
	case statusesTypes.CREATE_PRACTICE_TYPE.SUCCESS:
		return {
			...state,
			practiceTypes: [...state.practiceTypes, action.payload],
		};
	case statusesTypes.EDIT_PRACTICE_TYPE.SUCCESS:
		return {
			...state,
			practiceTypes: state.practiceTypes.map(type => type.id === action.payload.id ? action.payload : type),
		};
	case statusesTypes.DELETE_PRACTICE_TYPE.SUCCESS:
		return {
			...state,
			practiceTypes: state.practiceTypes.filter(type => type.id !== action.payload),
		};
	default:
		return { ...state };
	}
};
