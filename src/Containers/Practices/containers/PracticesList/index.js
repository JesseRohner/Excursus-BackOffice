import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';

import PlusIcon from '../../../../assets/svg/plus-circle.svg';
import PrimaryButton from '../../../Common/Buttons/PrimaryButton';
import {TABLE_KEYS} from '../../../Common/DataTables/constants';
import PracticesTable from '../../../Tables/PracticesTable';
import { practiceActions } from '../../store';
import {getAllPractices, getPracticesByStatus} from '../../store/selectors';
import AddPracticeModal from '../AddPracticeModal';
import styles from './PracticesList.module.scss';

export default ({statusId}) => {
	const dispatch = useDispatch();
	const practicesList = useSelector(getAllPractices());
	const practicesByStatus = useSelector( getPracticesByStatus() );
	const [isAddPracticeModalOpen, setIsAddPracticeModalOpen] = useState(false);
	const {pathname} = useLocation();

	useEffect( () => {
		if ( statusId ) {
			dispatch( practiceActions.GET_PRACTICES_BY_STATUS.REQUEST(statusId) );
		} else {
			dispatch( practiceActions.GET_PRACTICES.REQUEST() );
		}
	}, [ dispatch, statusId ] );

	return (
		<div className={ styles.container__inner }>
			<div className={ styles.container__header }>
				<h2>Practices</h2>
				<PrimaryButton
					height='34px'
					fontSize = '13px'
					padding = '8px 10px'
					text='Add Practice'
					leftIconSrc={PlusIcon}
					onClick={ () => setIsAddPracticeModalOpen(true)}
				/>
			</div>
			<PracticesTable
				practices={ statusId ? practicesByStatus : practicesList }
				tableKey={`${pathname}/${TABLE_KEYS.PRACTICE}`}
			/>
			<AddPracticeModal isAddPracticeModalOpen={ isAddPracticeModalOpen } setIsAddPracticeModalOpen={setIsAddPracticeModalOpen}/>
		</div>
	);
};
