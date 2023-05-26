import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';

import {TABLE_KEYS} from '../../../Common/DataTables/constants';
import StoresTable from '../../../Tables/StoresTable';
import { customerActions } from '../../store';
import {getAllStores} from '../../store/selectors';
import styles from '../ChiefsList/ChiefsList.module.scss';

export default () => {
	const dispatch = useDispatch();
	const storesList = useSelector(getAllStores());
	const {pathname} = useLocation();

	useEffect( () => {
		dispatch( customerActions.GET_ALL_STORES.REQUEST() );
	}, [ dispatch ] );

	return <div className={ styles.container__inner }>
		<StoresTable
			storesList={storesList}
			tableKey={`${pathname}/${TABLE_KEYS.STORE}`}
			paginationOption={true}
		/>
	</div>;
};
