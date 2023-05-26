import * as allSelectors from './selectors';

export * from './actions';
export { default as practicesSaga } from './sagas';
export { default as practicesReducer } from './reducers';

export const selectors = allSelectors;
