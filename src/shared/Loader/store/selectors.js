import { createSelector } from 'reselect';

const selectLoader = state => state.loader;

export const getLoader = () => createSelector(selectLoader, state => state.loading);
