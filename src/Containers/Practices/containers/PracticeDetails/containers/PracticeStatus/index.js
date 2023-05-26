import clx from 'classnames';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as ArrowIcon } from '../../../../../../assets/svg/arrow-small.svg';
import ChangeArrowsIcon from '../../../../../../assets/svg/arrows-change.svg';
import PrimaryButton from '../../../../../Common/Buttons/PrimaryButton';
import ConfirmModal from '../../../../../Common/ConfirmModal';
import { practiceActions } from '../../../../store';
import styles from './PracticeStatus.module.scss';

export default ({
	practiceId, practice, allStatuses
} ) => {
	const dispatch = useDispatch();

	const [ isStatusesListOpen, setIsStatusesListOpen ] = useState( false );
	const [ newPracticeStatus, setNewPracticeStatus ] = useState( null );

	return (
		<div className={ styles['practice-status__wrapper'] }>
			<p className={styles.status__label}>Status</p>
			<div className={styles['practice__status']} style={ {
				background: practice?.status?.color
			} }>
				<span>{ practice?.status?.name }</span>
				<span className={ clx( styles['open-list__btn'],
					{ [styles['btn__active']]: isStatusesListOpen } ) }
				onClick={ () => setIsStatusesListOpen( s => !s ) }>
					<ArrowIcon className={styles.arrow}/>
				</span>
			</div>
			{ isStatusesListOpen && <div className={ styles['statuses-list__wrapper'] }>
				<ul className={ styles['statuses-list'] }>
					{ allStatuses.map( status => {
						const isStatusActive = +status.id === +practice?.status?.id;
						return (
							<li key={ status?.id } style={ {
								background: isStatusActive && status?.color,
								color: !isStatusActive && status?.color
							} }
							className={ styles['status__item'] }
							onClick={ () => setNewPracticeStatus(status)}
							>
								{ status?.name }
							</li>
						);
					} ) }
				</ul>
			</div> }
			{ newPracticeStatus && <ConfirmModal
				isModalOpen={ !!newPracticeStatus }
				setIsModalOpen={ setNewPracticeStatus }
				title='You are changing the status of practice to'
				content={
					<div className={clx(styles.practice__status, styles['modal__practice-status'])} style={ {
						background: newPracticeStatus?.color
					} }>
						<span>{ newPracticeStatus?.name }</span>
					</div>
				}
				actionButton={
					<PrimaryButton
						text='Change Status'
						background='#0040DD'
						padding='8px'
						fontSize='15px'
						height='auto'
						width='180px'
						leftIconSrc={ ChangeArrowsIcon }
						onClick={ () => dispatch( practiceActions.EDIT_PRACTICE.REQUEST(
							{
								id: practiceId,
								status_id: newPracticeStatus?.id,
								customer_id: practice?.customer?.customer_id
							}, () => {
								setNewPracticeStatus( false );
								setIsStatusesListOpen( false );
							} ) ) }
					/>
				}
			/>
			}
		</div>
	);
};
