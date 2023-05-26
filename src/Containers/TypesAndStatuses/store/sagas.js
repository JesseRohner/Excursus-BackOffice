import {
	call, put, takeLatest
} from 'redux-saga/effects';

import { Api } from '../../../entries/ApiTransport';
import sagaAssessor from '../../../utils/sagaAssessor';
import { statusesActions, statusesTypes } from './actions';

const api = Api.getInstance();

const getAllStatuses = () => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( 'status' ) );
			yield put( statusesActions.GET_ALL_STATUSES.SUCCESS(data));
		},
	err => statusesActions.GET_ALL_STATUSES.FAILED(err),
);

const getDocumentTypes = () => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( '/types/document' ) );
			yield put( statusesActions.GET_DOCUMENT_TYPES.SUCCESS(data));
		},
	err => statusesActions.GET_DOCUMENT_TYPES.FAILED(err),
);

const getPracticesTypes = () => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.get( '/types/practice' ) );
			yield put( statusesActions.GET_PRACTICES_TYPES.SUCCESS(data));
		},
	err => statusesActions.GET_PRACTICES_TYPES.FAILED(err),
);

const createPracticesType = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const { data } = yield call( () => api.post( '/types/practice', payload ) );
			yield put( statusesActions.CREATE_PRACTICE_TYPE.SUCCESS(data));
			callback && typeof callback === 'function' && callback();
		},
	err => statusesActions.CREATE_PRACTICE_TYPE.FAILED(err),
);

const editPracticesType = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			const {id, ...type} = payload;
			const { data } = yield call( () => api.put( `/types/practice/${id}`, type ) );
			yield put( statusesActions.EDIT_PRACTICE_TYPE.SUCCESS(data));
			callback && typeof callback === 'function' && callback();
		},
	err => statusesActions.EDIT_PRACTICE_TYPE.FAILED(err),
);

const deletePracticesType = ({ payload, callback }) => sagaAssessor(
	() =>
		function* () {
			yield call( () => api.delete( `/types/practice/${payload}` ) );
			yield put( statusesActions.DELETE_PRACTICE_TYPE.SUCCESS(payload));
			callback && typeof callback === 'function' && callback();
		},
	err => statusesActions.DELETE_PRACTICE_TYPE.FAILED(err),
);

export default function* () {
	yield takeLatest(statusesTypes.GET_ALL_STATUSES.REQUEST, getAllStatuses);
	yield takeLatest(statusesTypes.GET_DOCUMENT_TYPES.REQUEST, getDocumentTypes);
	yield takeLatest(statusesTypes.GET_PRACTICES_TYPES.REQUEST, getPracticesTypes);
	yield takeLatest(statusesTypes.CREATE_PRACTICE_TYPE.REQUEST, createPracticesType);
	yield takeLatest(statusesTypes.EDIT_PRACTICE_TYPE.REQUEST, editPracticesType);
	yield takeLatest(statusesTypes.DELETE_PRACTICE_TYPE.REQUEST, deletePracticesType);
}
