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
import { customerActions } from '../../../store';
import { getStore } from '../../../store/selectors';
import StoreInfo from './containers/StoreInfo';
import styles from './StoreDetails.module.scss';

export default () => {
	const dispatch = useDispatch();
	const { storeId } = useParams();
	const store = useSelector(getStore());
	const {pathname} = useLocation();
	const navigate = useNavigate();
	const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
	useEffect(() => {
		dispatch( customerActions.GET_STORE.REQUEST(storeId) );
	}, [storeId, dispatch]);
	return (
		Object.values(store).length ?
			<div className={ styles.container__inner }>
				<StoreInfo
					storeDetails={store}
				/>
				<div className={ styles.container__header }>
					<h2>Practices</h2>
				</div>
				<PracticesTable
					practices={store.practices}
					tableKey={`${pathname}/${TABLE_KEYS.PRACTICE}`}
				/>
				<div className={ styles.container__action }>
					<PrimaryButton
						border='2px solid #D70015'
						text='Delete Store'
						color='#D70015'
						padding='10px'
						background='transparent'
						leftIconSrc={ BinIcon }
						onClick={() => setIsConfirmRemoveModalOpen(true)}
					/>
					{ isConfirmRemoveModalOpen && <ConfirmModal
						isModalOpen={ !!isConfirmRemoveModalOpen }
						setIsModalOpen={ setIsConfirmRemoveModalOpen }
						title='Do you want to delete this store?'
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
								dispatch( customerActions.DELETE_STORE.REQUEST( storeId,
									() => navigate( ROUTES.STORES ) ) );
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
