import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import PrimaryButton from '../../Containers/Common/Buttons/PrimaryButton';
import Modal from '../../Containers/Common/Modal';
import styles from './Error.module.scss';
import {actions} from './store';
import { getError } from './store/selectors';

export default () => {
	const error = useSelector(getError());
	const dispatch = useDispatch();
	const clear = () => {
		dispatch(actions.clearError());
	};
	return <Modal
		width='330px'
		height={'300px'}
		isModalOpen={ error }
		setIsModalOpen={clear}>
		<div className={styles.modal__content}>
			<h3>Error</h3>
			{error}
			<div className={styles.modal__actions}>
				<PrimaryButton
					text='Annul'
					background='transparent'
					padding='8px'
					height='auto'
					fontSize='15px'
					width='180px'
					color='#AEAEB2'
					onClick={clear}
				/>
			</div>
		</div>
	</Modal>;
};
