import * as allSelectors from './selectors';

export * from './actions';
export { default as detectivesSaga } from './sagas';
export { default as detectivesReducer } from './reducers';

export const selectors = allSelectors;
