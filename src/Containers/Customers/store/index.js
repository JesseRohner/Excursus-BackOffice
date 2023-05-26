import * as allSelectors from './selectors';

export * from './actions';
export { default as customersSaga } from './sagas';
export { default as customersReducer } from './reducers';

export const selectors = allSelectors;
