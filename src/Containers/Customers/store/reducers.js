import {customerTypes} from './actions';

const initialState = {
	customers: [],
	activeCustomer: {},
	activeStore: {},
	activeChief: {},
	stores: [],
	chiefs: []
};

export default (state = initialState, action) => {
	switch (action.type) {
	case customerTypes.GET_ALL_CUSTOMERS.SUCCESS:
		return {
			...state,
			customers: action.payload,
		};
	case customerTypes.GET_CUSTOMER.SUCCESS:
		return {
			...state,
			activeCustomer: action.payload,
		};
	case customerTypes.EDIT_CUSTOMER.SUCCESS:
		return {
			...state,
			activeCustomer: {
				...state.activeCustomer,
				customer: action.payload.customer
			},
		};
	case customerTypes.CREATE_CHIEF.SUCCESS:
		return {
			...state,
			activeCustomer: {
				...state.activeCustomer,
				chiefs: [...state.activeCustomer.chiefs, action.payload]
			},
		};
	case customerTypes.CREATE_STORE.SUCCESS:
		return {
			...state,
			activeCustomer: {
				...state.activeCustomer,
				stores: [...state.activeCustomer.stores, action.payload.store],
				chiefs: state.activeCustomer.chiefs.map(
					chief => action.payload.chief_ids.includes(chief.id) ?
						{...chief, stores: [...chief.stores, action.payload.store]} :
						chief
				)
			},
		};
	case customerTypes.CREATE_CUSTOMER_DOCUMENT.SUCCESS:
		return {
			...state,
			activeCustomer: {
				...state.activeCustomer,
				documents: [...state.activeCustomer.documents, action.payload]
			},
		};
	case customerTypes.GET_ALL_STORES.SUCCESS:
		return {
			...state,
			stores: action.payload,
		};
	case customerTypes.GET_STORE.SUCCESS:
		return {
			...state,
			activeStore: action.payload,
		};
	case customerTypes.GET_CHIEF.SUCCESS:
		return {
			...state,
			activeChief: action.payload,
		};
	case customerTypes.EDIT_STORE.SUCCESS:
		return {
			...state,
			activeStore: {
				...state.activeStore,
				store: action.payload.store,
				customerChiefs: action.payload.customerChiefs
			},
		};
	case customerTypes.EDIT_CHIEF.SUCCESS:
		return {
			...state,
			activeChief: {
				...state.activeChief,
				stores: action.payload.stores,
				chief: action.payload.chief
			},
		};
	case customerTypes.GET_ALL_CHIEFS.SUCCESS:
		return {
			...state,
			chiefs: action.payload,
		};
	case customerTypes.EDIT_CUSTOMER_DOCUMENT.SUCCESS:
		return {
			...state,
			activeCustomer: {
				...state.activeCustomer,
				documents: state.activeCustomer.documents.map( doc => {
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
