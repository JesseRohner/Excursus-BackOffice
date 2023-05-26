import { createSelector } from 'reselect';

const selectError = state => state.errorReducer;

export const getError = () => createSelector(selectError, state => state.error);
