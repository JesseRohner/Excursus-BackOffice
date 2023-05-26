import { call, put } from 'redux-saga/effects';

import { setError } from '../shared/Error/store/actions';
import { startLoader, stopLoader } from '../shared/Loader/store/actions';

export default function* (
	successAction,
	errorAction,
) {
	try {
		yield put(startLoader());
		yield call(successAction());
	} catch (error) {
		yield put(setError(error?.response?.data?.error || error?.response?.data?.message || null));
		yield put(errorAction(error?.response?.data?.error || error?.response?.data?.message || null));
	} finally {
		yield put(stopLoader());
	}
}
