import {practiceTypes} from './actions';

const initialState = {
	practices: [],
	practicesByStatus: [],
	infoForPracticeCreation: [],
	customerStores: [],
	activePractice: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
	case practiceTypes.GET_PRACTICES.SUCCESS:
		return {
			...state,
			practices: action.payload,
		};
	case practiceTypes.GET_PRACTICES_BY_STATUS.SUCCESS:
		return {
			...state,
			practicesByStatus: action.payload,
		};
	case practiceTypes.GET_INFO_FOR_PRACTICE_CREATION.SUCCESS:
		return {
			...state,
			infoForPracticeCreation: action.payload,
		};
	case practiceTypes.GET_CUSTOMER_STORES.SUCCESS:
		return {
			...state,
			customerStores: action.payload,
		};
	case practiceTypes.GET_PRACTICE.SUCCESS:
		return {
			...state,
			activePractice: action.payload,
		};
	case practiceTypes.EDIT_PRACTICE.SUCCESS:
		return {
			...state,
			activePractice: { ...state?.activePractice, practice: action.payload }
		};
	case practiceTypes.CREATE_PRACTICE_DOCUMENT.SUCCESS:
		return {
			...state,
			activePractice: {
				...state.activePractice,
				documents: [...state.activePractice.documents, action.payload]
			},
		};
	case practiceTypes.EDIT_PRACTICE_DOCUMENT.SUCCESS:
		return {
			...state,
			activePractice: {
				...state.activePractice,
				documents: state.activePractice.documents.map( doc => {
					if ( +doc?.id === +action.payload?.id ) {
						return { ...doc, ...action.payload };
					} else {
						return doc;
					}
				})
			},
		};
	default:
		return { ...state };
	}
};
