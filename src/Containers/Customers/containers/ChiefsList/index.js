import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';

import {TABLE_KEYS} from '../../../Common/DataTables/constants';
import ChiefsTable from '../../../Tables/ChiefsTable';
import { customerActions } from '../../store';
import {getAllChiefs} from '../../store/selectors';
import styles from './ChiefsList.module.scss';

export default () => {
	const dispatch = useDispatch();
	const chiefsList = useSelector(getAllChiefs());
	const {pathname} = useLocation();

	useEffect( () => {
		dispatch( customerActions.GET_ALL_CHIEFS.REQUEST() );
	}, [ dispatch ] );

	return (
		<div className={ styles.container__inner }>
			<ChiefsTable
				chiefsList={chiefsList}
				tableKey={`${pathname}/${TABLE_KEYS.CHIEF}`}
				paginationOption={true}
			/>
		</div>
	);
};
