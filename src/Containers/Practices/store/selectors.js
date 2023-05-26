import { createSelector } from 'reselect';

const selectPracticesState = state => state.practicesReducer;

export const getAllPractices = () => createSelector(selectPracticesState, state => state.practices);
export const getPracticesByStatus = () => createSelector(selectPracticesState, state => state.practicesByStatus);
export const getInfoForPracticeCreation = () => createSelector(selectPracticesState, state => state.infoForPracticeCreation);
export const getCustomerStores = () => createSelector(selectPracticesState, state => state.customerStores);
export const getPractice = () => createSelector(selectPracticesState, state => state.activePractice);
