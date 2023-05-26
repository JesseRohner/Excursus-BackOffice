import * as constants from './constants';

export const setError = err => ({ type: constants.SET_ERROR, payload: err});
export const clearError = () => ({ type: constants.CLEAR_ERROR});

