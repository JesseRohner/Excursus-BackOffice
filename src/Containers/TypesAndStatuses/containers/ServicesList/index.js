import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import BinWhiteIcon from '../../../../assets/svg/bin-white.svg';
import EyeIcon from '../../../../assets/svg/eye.svg';
import PlusIcon from '../../../../assets/svg/plus-circle.svg';
import PrimaryButton from '../../../Common/Buttons/PrimaryButton';
import ConfirmModal from '../../../Common/ConfirmModal';
import {statusesActions} from '../../store';
import { getPracticeTypes } from '../../store/selectors';
import ServiceModal from './containers/ServiceModal';

const ServiceItem = ({
	                     item,
	                     setService
}) => (
	<div style={{
		display: 'flex',
		width: '25%',
		marginBottom: '65px'
	}}>
		<div style={{
			border: '2px solid #2E3338',
			width: '160px',
			padding: '5px 10px',
			marginRight: '11px',
			borderRadius: '5px',
			textAlign: 'center',
			verticalAlign: 'center',
		}}>
			<b>{item.name}</b>
		</div>
		<img
			style={{
				cursor: 'pointer'
			}}
			onClick={() => setService(item)}
			src={EyeIcon} alt="edit"/>
	</div>
);

export default () => {
	const dispatch = useDispatch();
	const practiceTypes = useSelector( getPracticeTypes() );
	const [service, setService] = useState(false);
	const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);

	useEffect( () => {
		dispatch( statusesActions.GET_PRACTICES_TYPES.REQUEST() );
	}, [ dispatch ] );

	return (
		<>
			{ isConfirmRemoveModalOpen && <ConfirmModal
				isModalOpen={ !!isConfirmRemoveModalOpen }
				setIsModalOpen={ setIsConfirmRemoveModalOpen }
				title='Do you want to delete this service?'
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
						dispatch( statusesActions.DELETE_PRACTICE_TYPE.REQUEST( service.id,
							() => {setIsConfirmRemoveModalOpen(false); setService(false);} ) );
					}}
				/>
				}
			/>
			}
			<ServiceModal
				service={service}
				setService={setService}
				isEditForm={Boolean(Object.keys(service).length)}
				setIsConfirmRemoveModalOpen={setIsConfirmRemoveModalOpen}
			/>
			<div style={{
				display: 'flex',
				justifyContent: 'space-between',
				marginBottom: '30px'
			}}>
				<h2>Services</h2>
				<PrimaryButton
					height='34px'
					fontSize = '13px'
					padding = '8px 10px'
					text='Add Service'
					leftIconSrc={PlusIcon}
					onClick={ () => setService({})}
				/>
			</div>
			<div style={{
				display: 'flex',
				width: '100%',
				flexWrap: 'wrap',
				backgroundColor: 'white',
				border: '1px solid #DCDFE3',
				padding: '30px 16px',
				borderRadius: '14px'
			}}>
				{
					practiceTypes.map(practice => <ServiceItem
						key={practice.id}
						item={practice}
						setService={setService}
					/>)
				}
			</div>
		</>
	);
};
