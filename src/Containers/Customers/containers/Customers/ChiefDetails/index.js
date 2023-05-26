import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	useLocation,
	useNavigate,
	useParams
} from 'react-router-dom';

import BinIcon from '../../../../../assets/svg/bin.svg';
import BinWhiteIcon from '../../../../../assets/svg/bin-white.svg';
import {ROUTES} from '../../../../../routes/constants';
import PrimaryButton from '../../../../Common/Buttons/PrimaryButton';
import ConfirmModal from '../../../../Common/ConfirmModal';
import {TABLE_KEYS} from '../../../../Common/DataTables/constants';
import PracticesTable from '../../../../Tables/PracticesTable';
import StoresTable from '../../../../Tables/StoresTable';
import { customerActions } from '../../../store';
import {getChief} from '../../../store/selectors';
import styles from './ChiefDetails.module.scss';
import ChiefInfo from './containers/ChiefInfo';

export default () => {
	const dispatch = useDispatch();
	const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
	const { chiefId } = useParams();
	const chief = useSelector(getChief());
	const {pathname} = useLocation();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch( customerActions.GET_CHIEF.REQUEST(chiefId) );
	}, [chiefId, dispatch]);
	return (
		Object.values(chief).length ?
			<div className={ styles.container__inner }>
				<ChiefInfo
					chiefDetails={chief}
				/>
				<div className={ styles.container__header }>
					<h2>Stores</h2>
				</div>
				<StoresTable
					storesList={chief?.stores}
					tableKey={`${pathname}/${TABLE_KEYS.STORE}`}
				/>
				<div className={ styles.container__header }>
					<h2>Practices</h2>
				</div>
				<PracticesTable
					practices={chief?.practices}
					tableKey={`${pathname}/${TABLE_KEYS.PRACTICE}`}
				/>
				<div className={ styles.container__action }>
					<PrimaryButton
						border='2px solid #D70015'
						text='Delete Chief Manager'
						color='#D70015'
						padding='10px'
						background='transparent'
						leftIconSrc={ BinIcon }
						onClick={() => setIsConfirmRemoveModalOpen(true)}
					/>
					{ isConfirmRemoveModalOpen && <ConfirmModal
						isModalOpen={ !!isConfirmRemoveModalOpen }
						setIsModalOpen={ setIsConfirmRemoveModalOpen }
						title='Do you want to delete this chief manager?'
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
								dispatch( customerActions.DELETE_CLIENT.REQUEST( chiefId,
									() => navigate( ROUTES.CHIEF_MANAGERS ) ) );
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
