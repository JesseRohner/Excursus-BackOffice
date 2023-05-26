import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	useLocation,
	useNavigate,
	useParams
} from 'react-router-dom';

import BinIcon from '../../../../assets/svg/bin.svg';
import BinWhiteIcon from '../../../../assets/svg/bin-white.svg';
import {ROUTES} from '../../../../routes/constants';
import PrimaryButton from '../../../Common/Buttons/PrimaryButton';
import ConfirmModal from '../../../Common/ConfirmModal';
import {TABLE_KEYS} from '../../../Common/DataTables/constants';
import {customerActions} from '../../../Customers/store';
import PracticesTable from '../../../Tables/PracticesTable';
import { detectiveActions } from '../../store';
import {getDetective} from '../../store/selectors';
import DetectiveInfo from './containers/DetectiveInfo';
import styles from './DetectiveDetails.module.scss';

export default () => {
	const dispatch = useDispatch();
	const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
	const { detectiveId } = useParams();
	const detective = useSelector(getDetective());
	const {pathname} = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch( detectiveActions.GET_DETECTIVE.REQUEST(detectiveId) );
	}, [detectiveId, dispatch]);
	return (
		Object.values(detective).length ?
			<div className={ styles.container__inner }>
				<DetectiveInfo
					detectiveDetails={detective}
				/>
				<div className={ styles.container__header }>
					<h2>Practices</h2>
				</div>
				<PracticesTable
					practices={detective?.practices}
					tableKey={`${pathname}/${TABLE_KEYS.PRACTICE}`}
				/>
				<div className={ styles.container__action }>
					<PrimaryButton
						border='2px solid #D70015'
						text='Delete Detective'
						color='#D70015'
						padding='10px'
						background='transparent'
						leftIconSrc={ BinIcon }
						onClick={() => setIsConfirmRemoveModalOpen(true)}
					/>
					{ isConfirmRemoveModalOpen && <ConfirmModal
						isModalOpen={ !!isConfirmRemoveModalOpen }
						setIsModalOpen={ setIsConfirmRemoveModalOpen }
						title='Do you want to delete this detective?'
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
								dispatch( customerActions.DELETE_CLIENT.REQUEST( detectiveId,
									() => navigate( ROUTES.DETECTIVES ) ) );
							} }
						/>
						}
					/>
					}
				</div>
			</div> :
			null
	);
};
