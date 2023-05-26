import {
	call, put, takeLatest
} from 'redux-saga/effects';

import { Api } from '../../../entries/ApiTransport';
import sagaAssessor from '../../../utils/sagaAssessor';
import { practiceActions, practiceTypes } from './actions';

const api = Api.getInstance();

const getPractices = () => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( 'practice' ) );
			yield put( practiceActions.GET_PRACTICES.SUCCESS(data));
		},
	err => practiceActions.GET_PRACTICES.FAILED(err),
);

const getPracticesByStatus = ({ payload }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( `practice?status_id=${payload}` ) );
			yield put( practiceActions.GET_PRACTICES_BY_STATUS.SUCCESS(data));
		},
	err => practiceActions.GET_PRACTICES_BY_STATUS.FAILED(err)
);

const getInfoForPracticeCreation = () => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( '/practice/information' ) );
			yield put( practiceActions.GET_INFO_FOR_PRACTICE_CREATION.SUCCESS(data));
		},
	err => practiceActions.GET_INFO_FOR_PRACTICE_CREATION.FAILED(err),
);

const getCustomerStores = ({ payload }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( `/stores?customer_id=${payload}` ) );
			yield put( practiceActions.GET_CUSTOMER_STORES.SUCCESS(data));
		},
	err => practiceActions.GET_CUSTOMER_STORES.FAILED(err)
);

const addPractice = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.post( '/practice', payload ) );
			yield put( practiceActions.ADD_PRACTICE.SUCCESS() );
			callback && typeof callback === 'function' && callback(data.id);
		},
	err => practiceActions.ADD_PRACTICE.FAILED(err),
);

const getPractice = ({ payload }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( `/practice/${payload}` ) );
			yield put( practiceActions.GET_PRACTICE.SUCCESS(data));
		},
	err => practiceActions.GET_PRACTICE.FAILED(err)
);

const editPractice = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const { id, ...rest } = payload;
			const { data } = yield call( () => api.put( `/practice/${id}`, rest ) );
			yield put( practiceActions.EDIT_PRACTICE.SUCCESS(data.practice.practice));
			callback && typeof callback === 'function' && callback();
		},
	err => practiceActions.EDIT_PRACTICE.FAILED(err)
);

const deletePractice = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.delete( `/practice/${payload}` ) );
			yield put( practiceActions.DELETE_PRACTICE.SUCCESS());
			callback && typeof callback === 'function' && callback();
		},
	err => practiceActions.DELETE_PRACTICE.FAILED(err)
);

const createDocument = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const {practice_id, ...document} = payload;
			const { data } = yield call( () => api.post( `/documents?practice_id=${practice_id}`, document) );
			yield put(practiceActions.CREATE_PRACTICE_DOCUMENT.SUCCESS(data));
			callback && typeof callback === 'function' && callback();
		},
	err => practiceActions.CREATE_PRACTICE_DOCUMENT.FAILED(err)
);

const editDocument = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const {document_id, ...document} = payload;
			const { data } = yield call( () => api.put( `/documents/${document_id}`, document ) );
			yield put(practiceActions.EDIT_PRACTICE_DOCUMENT.SUCCESS(data));
		},
	err => practiceActions.EDIT_PRACTICE_DOCUMENT.FAILED(err),
	callback && typeof callback === 'function' && callback(),
);

export default function* () {
	yield takeLatest(practiceTypes.GET_PRACTICES.REQUEST, getPractices);
	yield takeLatest(practiceTypes.GET_PRACTICES_BY_STATUS.REQUEST, getPracticesByStatus);
	yield takeLatest(practiceTypes.GET_INFO_FOR_PRACTICE_CREATION.REQUEST, getInfoForPracticeCreation);
	yield takeLatest(practiceTypes.GET_CUSTOMER_STORES.REQUEST, getCustomerStores);
	yield takeLatest(practiceTypes.ADD_PRACTICE.REQUEST, addPractice);
	yield takeLatest(practiceTypes.GET_PRACTICE.REQUEST, getPractice);
	yield takeLatest(practiceTypes.EDIT_PRACTICE.REQUEST, editPractice);
	yield takeLatest(practiceTypes.DELETE_PRACTICE.REQUEST, deletePractice);
	yield takeLatest(practiceTypes.CREATE_PRACTICE_DOCUMENT.REQUEST, createDocument);
	yield takeLatest(practiceTypes.EDIT_PRACTICE_DOCUMENT.REQUEST, editDocument);
}
