import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation} from 'react-router-dom';

import PlusIcon from '../../../../assets/svg/plus-circle.svg';
import PrimaryButton from '../../../Common/Buttons/PrimaryButton';
import {TABLE_KEYS} from '../../../Common/DataTables/constants';
import DetectivesTable from '../../../Tables/DetectivesTable';
import {detectiveActions} from '../../store';
import {getAllDetectives} from '../../store/selectors';
import DetectiveModal from '../Modals/DetectiveModal';
import styles from './DetectivesList.module.scss';

export default () => {
	const dispatch = useDispatch();
	const detectivesList = useSelector(getAllDetectives());
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {pathname} = useLocation();
	useEffect( () => {
		dispatch( detectiveActions.GET_ALL_DETECTIVES.REQUEST() );
	}, [ dispatch ] );
	return (
		<div className={ styles.container__inner }>
			<div className={ styles.container__header }>
				<h2>Detectives</h2>
				<PrimaryButton
					height='34px'
					fontSize = '13px'
					padding = '8px 10px'
					text='Add Detective'
					leftIconSrc={PlusIcon}
					onClick={ () => setIsModalOpen(true)}
				/>
			</div>
			<DetectivesTable
				detectivesList={ detectivesList }
				tableKey={`${pathname}/${TABLE_KEYS.CUSTOMER}`}
				paginationOption={true}
			/>
			<DetectiveModal isModalOpen={ isModalOpen } setIsModalOpen={setIsModalOpen}/>
		</div>
	);
};
