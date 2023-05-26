import * as allSelectors from './selectors';

export * from './actions';
export { default as dashboardSaga } from './sagas';
export { default as dashboardReducer } from './reducers';

export const selectors = allSelectors;
