import { createSelector } from 'reselect';

const selectStatusesState = state => state.statusesReducer;

export const getAllStatuses = () => createSelector(selectStatusesState, state => state.allStatuses);
export const getDocumentTypes = () => createSelector(selectStatusesState, state => state.documentTypes);
export const getPracticeTypes = () => createSelector(selectStatusesState, state => state.practiceTypes);
