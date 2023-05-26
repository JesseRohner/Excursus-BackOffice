import { createSelector } from 'reselect';

const selectDetectivesState = state => state.detectivesReducer;

export const getAllDetectives = () => createSelector( selectDetectivesState, state => state.detectives);
export const getDetective = () => createSelector( selectDetectivesState, state => state.activeDetective);
