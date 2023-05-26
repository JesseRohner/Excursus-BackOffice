import {
	call, put, takeLatest
} from 'redux-saga/effects';

import { Api } from '../../../entries/ApiTransport';
import sagaAssessor from '../../../utils/sagaAssessor';
import { customerActions, customerTypes } from './actions';

const api = Api.getInstance();

const getAllCustomers = () => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( '/users/customers' ) );
			yield put(customerActions.GET_ALL_CUSTOMERS.SUCCESS(data));
		},
	err => customerActions.GET_ALL_CUSTOMERS.FAILED(err),
);

const getCustomer = ({ payload }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( `/users/customers/${payload}` ) );
			yield put(customerActions.GET_CUSTOMER.SUCCESS(data));
		},
	err => customerActions.GET_CUSTOMER.FAILED(err),
);

const createCustomer = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.post( '/registration/customer', payload) );
			yield put(customerActions.CREATE_CUSTOMER.SUCCESS());
			callback && typeof callback === 'function' && callback(data.id);
		},
	err => customerActions.CREATE_CUSTOMER.FAILED(err),
);

const editCustomer = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const {id, ...user} = payload;
			const { data } = yield call( () => api.put( `/users/customers/${id}`, user) );
			yield put(customerActions.EDIT_CUSTOMER.SUCCESS(data));
			callback && typeof callback === 'function' && callback();
		},
	err => customerActions.EDIT_CUSTOMER.FAILED(err)
);

const deleteClient = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			yield call( () => api.delete( `/users/${payload}`) );
			// yield put(customerActions.DELETE_CLIENT.SUCCESS(data));
			callback && typeof callback === 'function' && callback();
		},
	err => customerActions.DELETE_CLIENT.FAILED(err)
);

const getAllStores = () => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( 'stores' ) );
			yield put(customerActions.GET_ALL_STORES.SUCCESS(data));
		},
	err => customerActions.GET_ALL_STORES.FAILED(err)
);

const getStore = ({ payload }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( `/stores/${payload}` ) );
			yield put(customerActions.GET_STORE.SUCCESS(data));
		},
	err => customerActions.GET_STORE.FAILED(err),
);

const createStore = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.post( '/stores', payload) );
			yield put(customerActions.CREATE_STORE.SUCCESS({store: data, chief_ids: payload.chief_ids}));
			callback && typeof callback === 'function' && callback();
		},
	err => customerActions.CREATE_STORE.FAILED(err),
);

const editStore = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const {store_id, ...store} = payload;
			const { data } = yield call( () => api.put( `/stores/${store_id}`, store) );
			yield put(customerActions.EDIT_STORE.SUCCESS(data));
			callback && typeof callback === 'function' && callback();
		},
	err => customerActions.EDIT_STORE.FAILED(err)
);

const deleteStore = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			yield call( () => api.delete( `/stores/${payload}`) );
			// yield put(customerActions.DELETE_STORE.SUCCESS(data));
			callback && typeof callback === 'function' && callback();
		},
	err => customerActions.DELETE_STORE.FAILED(err)
);

const getAllChiefs = () => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( '/users/chiefs' ) );
			yield put(customerActions.GET_ALL_CHIEFS.SUCCESS(data));
		},
	err => customerActions.GET_ALL_CHIEFS.FAILED(err)
);

const getChief = ({ payload }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( `/users/chiefs/${payload}` ) );
			yield put(customerActions.GET_CHIEF.SUCCESS(data));
		},
	err => customerActions.GET_CHIEF.FAILED(err),
);

const createChief = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.post( '/registration/chief', payload) );
			yield put(customerActions.CREATE_CHIEF.SUCCESS(data));
			callback && typeof callback === 'function' && callback();
		},
	err => customerActions.CREATE_CHIEF.FAILED(err),
);

const editChief = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const {chief_id, ...user} = payload;
			const { data } = yield call( () => api.put( `/users/chiefs/${chief_id}`, user) );
			callback && typeof callback === 'function' && callback();
			yield put(customerActions.EDIT_CHIEF.SUCCESS(data));
		},
	err => customerActions.EDIT_CHIEF.FAILED(err)
);

const createDocument = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const {customer_id, ...document} = payload;
			const { data } = yield call( () => api.post( `/documents?customer_id=${customer_id}`, document) );
			yield put(customerActions.CREATE_CUSTOMER_DOCUMENT.SUCCESS(data));
			callback && typeof callback === 'function' && callback();
		},
	err => customerActions.CREATE_CUSTOMER_DOCUMENT.FAILED(err),
);

const editDocument = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const {document_id, ...document} = payload;
			const { data } = yield call( () => api.put( `/documents/${document_id}`, document ) );
			yield put(customerActions.EDIT_CUSTOMER_DOCUMENT.SUCCESS(data));
		},
	err => customerActions.EDIT_CUSTOMER_DOCUMENT.FAILED(err),
	callback && typeof callback === 'function' && callback(),
);

export default function* () {
	yield takeLatest(customerTypes.GET_ALL_CUSTOMERS.REQUEST, getAllCustomers);
	yield takeLatest(customerTypes.GET_CUSTOMER.REQUEST, getCustomer);
	yield takeLatest(customerTypes.CREATE_CUSTOMER.REQUEST, createCustomer);
	yield takeLatest(customerTypes.EDIT_CUSTOMER.REQUEST, editCustomer);
	yield takeLatest(customerTypes.DELETE_CLIENT.REQUEST, deleteClient);
	yield takeLatest(customerTypes.EDIT_STORE.REQUEST, editStore);
	yield takeLatest(customerTypes.DELETE_STORE.REQUEST, deleteStore);
	yield takeLatest(customerTypes.EDIT_CHIEF.REQUEST, editChief);
	yield takeLatest(customerTypes.GET_ALL_STORES.REQUEST, getAllStores);
	yield takeLatest(customerTypes.GET_STORE.REQUEST, getStore);
	yield takeLatest(customerTypes.GET_CHIEF.REQUEST, getChief);
	yield takeLatest(customerTypes.GET_ALL_CHIEFS.REQUEST, getAllChiefs);
	yield takeLatest(customerTypes.CREATE_CHIEF.REQUEST, createChief);
	yield takeLatest(customerTypes.CREATE_STORE.REQUEST, createStore);
	yield takeLatest(customerTypes.CREATE_CUSTOMER_DOCUMENT.REQUEST, createDocument);
	yield takeLatest(customerTypes.EDIT_CUSTOMER_DOCUMENT.REQUEST, editDocument);
}
