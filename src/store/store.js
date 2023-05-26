import {
	applyMiddleware, compose,
	createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

window.devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

const store = createStore(
	rootReducers(),
	compose(
		applyMiddleware(sagaMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f,
	),
);

sagaMiddleware.run(rootSaga);

export default store;
