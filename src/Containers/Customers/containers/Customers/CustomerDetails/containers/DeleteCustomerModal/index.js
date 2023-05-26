import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import BinIcon from '../../../../../../../assets/svg/bin.svg';
import BinWhiteIcon from '../../../../../../../assets/svg/bin-white.svg';
import {ROUTES} from '../../../../../../../routes/constants';
import PrimaryButton from '../../../../../../Common/Buttons/PrimaryButton';
import ConfirmModal from '../../../../../../Common/ConfirmModal';
import {customerActions} from '../../../../../store';

export default ({customerId}) => {
	const dispatch = useDispatch();
	const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
	const navigate = useNavigate();

	return (
		<>
			<PrimaryButton
				border='2px solid #D70015'
				text='Delete Customer'
				color='#D70015'
				padding='10px'
				background='transparent'
				leftIconSrc={ BinIcon }
				onClick={() => setIsConfirmRemoveModalOpen(true)}
			/>
			{ isConfirmRemoveModalOpen && <ConfirmModal
				isModalOpen={ !!isConfirmRemoveModalOpen }
				setIsModalOpen={ setIsConfirmRemoveModalOpen }
				title='Do you want to delete this customer?'
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
						dispatch( customerActions.DELETE_CLIENT.REQUEST( customerId,
							() => navigate( ROUTES.CUSTOMERS ) ) );
					} }
				/>
				}
			/>
			}
		</>
	);
};
