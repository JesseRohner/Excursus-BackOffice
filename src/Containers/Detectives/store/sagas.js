import {
	call, put, takeLatest
} from 'redux-saga/effects';

import { Api } from '../../../entries/ApiTransport';
import sagaAssessor from '../../../utils/sagaAssessor';
import { detectiveActions, detectiveTypes } from './actions';

const api = Api.getInstance();

const getAllDetectives = () => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( '/users/detectives' ) );
			yield put(detectiveActions.GET_ALL_DETECTIVES.SUCCESS(data));
		},
	err => detectiveActions.GET_ALL_DETECTIVES.FAILED(err),
);

const getDetective = ({ payload }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( `/users/detectives/${payload}` ) );
			yield put(detectiveActions.GET_DETECTIVE.SUCCESS(data));
		},
	err => detectiveActions.GET_DETECTIVE.FAILED(err),
);

const createDetective = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.post( '/registration/detective', payload) );
			// yield put(detectiveActions.CREATE_DETECTIVE.SUCCESS());
			callback && typeof callback === 'function' && callback(data.id);
		},
	err => detectiveActions.CREATE_DETECTIVE.FAILED(err),
);

const editDetective = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const {id, ...user} = payload;
			const { data } = yield call( () => api.put( `/users/detectives/${id}`, user) );
			console.log(data);
			yield put(detectiveActions.EDIT_DETECTIVE.SUCCESS(data));
			callback && typeof callback === 'function' && callback();
		},
	err => detectiveActions.EDIT_DETECTIVE.FAILED(err)
);

export default function* () {
	yield takeLatest(detectiveTypes.GET_ALL_DETECTIVES.REQUEST, getAllDetectives);
	yield takeLatest(detectiveTypes.GET_DETECTIVE.REQUEST, getDetective);
	yield takeLatest(detectiveTypes.CREATE_DETECTIVE.REQUEST, createDetective);
	yield takeLatest(detectiveTypes.EDIT_DETECTIVE.REQUEST, editDetective);
	// yield takeLatest(customerTypes.DELETE_CLIENT.REQUEST, deleteClient);
	// yield takeLatest(customerTypes.EDIT_STORE.REQUEST, editStore);
	// yield takeLatest(customerTypes.DELETE_STORE.REQUEST, deleteStore);
	// yield takeLatest(customerTypes.EDIT_CHIEF.REQUEST, editChief);
	// yield takeLatest(customerTypes.GET_ALL_STORES.REQUEST, getAllStores);
	// yield takeLatest(customerTypes.GET_STORE.REQUEST, getStore);
	// yield takeLatest(customerTypes.GET_CHIEF.REQUEST, getChief);
	// yield takeLatest(customerTypes.GET_ALL_CHIEFS.REQUEST, getAllChiefs);
	// yield takeLatest(customerTypes.CREATE_CHIEF.REQUEST, createChief);
	// yield takeLatest(customerTypes.CREATE_STORE.REQUEST, createStore);
	// yield takeLatest(customerTypes.CREATE_CUSTOMER_DOCUMENT.REQUEST, createDocument);
}
