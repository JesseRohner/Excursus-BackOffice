import React, {useEffect, useState} from 'react';

import PlusIcon from '../../../../../../../assets/svg/plus-circle.svg';
import PrimaryButton from '../../../../../../Common/Buttons/PrimaryButton';
import ChiefModal from '../../../Modals/ChiefModal';
import styles from './AddChiefModal.module.scss';



const AddChiefModal = ({customerId, stores}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<div className={ styles.container__header }>
				<h2>Zone Chief Managers</h2>
				<PrimaryButton
					height='34px'
					fontSize = '13px'
					padding = '8px 10px'
					text='Add Zone Chief'
					leftIconSrc={PlusIcon}
					onClick={ () => setIsModalOpen(true)}
				/>
			</div>
			<ChiefModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				customerId={customerId}
				customerStores={stores}
			/>
		</>
	);
};

export default AddChiefModal;
