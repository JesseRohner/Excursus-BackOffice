import React, {useState} from 'react';

import PlusIcon from '../../../../../../../assets/svg/plus-circle.svg';
import PrimaryButton from '../../../../../../Common/Buttons/PrimaryButton';
import StoreModal from '../../../Modals/StoreModal';
import styles from './AddStoreModal.module.scss';

export default ({	customerId, customerChiefs }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	return (
		<>
			<div className={ styles.container__header }>
				<h2>Stores</h2>
				<PrimaryButton
					height='34px'
					fontSize = '13px'
					padding = '8px 10px'
					text='Add Store'
					leftIconSrc={PlusIcon}
					onClick={ () => setModalIsOpen(true)}
				/>
			</div>
			<StoreModal
				modalIsOpen={modalIsOpen}
				setModalIsOpen={setModalIsOpen}
				customerId={customerId}
				customerChiefs={customerChiefs}
			/>
		</>
	);
};
