import { all } from 'redux-saga/effects';

import { authSaga } from '../Containers/Auth/store/';
import { customersSaga } from '../Containers/Customers/store';
import { dashboardSaga } from '../Containers/Dashboard/store';
import { detectivesSaga } from '../Containers/Detectives/store';
import { practicesSaga } from '../Containers/Practices/store';
import { statusesSaga } from '../Containers/TypesAndStatuses/store';


export default function* rootSaga() {
	yield all( [
		authSaga(),
		dashboardSaga(),
		customersSaga(),
		practicesSaga(),
		statusesSaga(),
		detectivesSaga(),
	] );
}
