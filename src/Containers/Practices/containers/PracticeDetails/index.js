import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	useLocation, useNavigate, useParams
} from 'react-router-dom';

import BinIcon from '../../../../assets/svg/bin.svg';
import BinWhiteIcon from '../../../../assets/svg/bin-white.svg';
import CheckIcon from '../../../../assets/svg/check.svg';
import { ROUTES } from '../../../../routes/constants';
import PrimaryButton from '../../../Common/Buttons/PrimaryButton';
import ConfirmModal from '../../../Common/ConfirmModal';
import { TABLE_KEYS } from '../../../Common/DataTables/constants';
import DocumentsTable from '../../../Tables/DocumentsTable';
import {statusesActions} from '../../../TypesAndStatuses/store';
import {getAllStatuses} from '../../../TypesAndStatuses/store/selectors';
import { practiceActions } from '../../store';
import { getPractice } from '../../store/selectors';
import PracticeInfo from './containers/PracticeInfo';
import PracticeStatus from './containers/PracticeStatus';
import styles from './PracticeDetails.module.scss';

export default () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	let { practiceId } = useParams();
	const practiceDetails = useSelector(getPractice());
	const allStatuses = useSelector( getAllStatuses() );
	const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);

	useEffect(() => {
		dispatch( practiceActions.GET_PRACTICE.REQUEST( practiceId ) );
		dispatch( statusesActions.GET_ALL_STATUSES.REQUEST() );
	}, [ practiceId, dispatch ] );

	return (
		<div className={ styles.container__inner }>
			{ practiceDetails &&
				<>
					<h2 className={ styles.container__title }>{ practiceDetails?.practice?.title }</h2>
					<div className={styles['practice__details']}>
						<PracticeStatus practice={ practiceDetails?.practice } practiceId={ practiceId } allStatuses={ allStatuses }/>
						<PracticeInfo practiceDetails={practiceDetails?.practice}/>
					</div>
					<div className={styles.table__wrapper}>
						<DocumentsTable
							documents={ practiceDetails?.documents }
							tableKey={ `${pathname}/${TABLE_KEYS.DOCUMENT}` }
							parentId={practiceId}
						/>
					</div>
					<div className={styles.container__actions}>
						<PrimaryButton
							border='2px solid #248A3D'
							text='Close Practice'
							color='#248A3D'
							padding='10px'
							background='transparent'
							leftIconSrc={ CheckIcon }
							onClick={() => navigate(ROUTES.PRACTICES)}
						/>
						<PrimaryButton
							border='2px solid #D70015'
							text='Delete Practice'
							color='#D70015'
							padding='10px'
							background='transparent'
							leftIconSrc={ BinIcon }
							onClick={() => setIsConfirmRemoveModalOpen(true)}
						/>
					</div>
				</>
			}
			{ isConfirmRemoveModalOpen && <ConfirmModal
				isModalOpen={ !!isConfirmRemoveModalOpen }
				setIsModalOpen={ setIsConfirmRemoveModalOpen }
				title='Do you want to delete this practice?'
				actionButton={ <PrimaryButton
					width='100px'
					height='40px'
					fontSize='15px'
					padding='12px 5px'
					leftIconSrc={ BinWhiteIcon }
					text='Delete'
					background='#D70015'
					color='#FFFF'
					onClick={ () => {
						dispatch( practiceActions.DELETE_PRACTICE.REQUEST( practiceId,
							() => navigate( ROUTES.PRACTICES ) ) );
					} }
				/>
				}
			/>
			}
		</div>
	);
};
