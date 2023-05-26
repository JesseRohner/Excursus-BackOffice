import { createSelector } from 'reselect';

const selectCustomersState = state => state.customersReducer;

export const getAllCustomers = () => createSelector( selectCustomersState, state => state.customers);
export const getCustomer = () => createSelector( selectCustomersState, state => state.activeCustomer);
export const getStore = () => createSelector( selectCustomersState, state => state.activeStore);
export const getChief = () => createSelector( selectCustomersState, state => state.activeChief);
export const getAllStores = () => createSelector( selectCustomersState, state => state.stores);
export const getAllChiefs = () => createSelector( selectCustomersState, state => state.chiefs);
