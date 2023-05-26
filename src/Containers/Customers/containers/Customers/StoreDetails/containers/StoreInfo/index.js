import React, { useState } from 'react';

import PencilIcon from '../../../../../../../assets/svg/pencil.svg';
import PrimaryButton from '../../../../../../Common/Buttons/PrimaryButton';
import Label from '../../../../../../Common/Label';
import TextFieldMockup from '../../../../../../Common/TextFieldMockup';
import StoreModal from '../../../Modals/StoreModal';
// import AddPracticeModal from '../../../../AddPracticeModal';
import styles from './StoreInfo.module.scss';

export default ( { storeDetails } ) => {
	const [ isEditModalOpen, setIsEditModalOpen ] = useState( false );
	const dateCreation = storeDetails?.store?.created_at &&
		new Date( storeDetails?.store?.created_at ).toLocaleDateString( 'it-IT', {
			'day': '2-digit',
			'month': '2-digit',
			'year': 'numeric'
		} );
	const dateUpdated = storeDetails?.store?.updated_at &&
		new Date( storeDetails?.store?.updated_at ).toLocaleDateString( 'it-IT', {
			'day': '2-digit',
			'month': '2-digit',
			'year': 'numeric',
			'hour': 'numeric',
			'minute': 'numeric',
			'hour12': true
		} );

	// eslint-disable-next-line max-len
	const storeAddress = `${storeDetails?.store?.address?.street},${storeDetails?.store?.address?.building_number || '-'},apt. ${storeDetails?.store?.address?.apartment || '-'}`;
	const storeChiefs = storeDetails?.customerChiefs?.filter(
		chief => chief.stores.some(item => item.store_id === storeDetails?.store?.store_id
		));
	return (
		<div className={styles['store__info-block']}>
			<h2 style={{paddingBottom: '25px'}}>{storeDetails.store.name}</h2>
			<p className={styles['info__dates']}>
				Added on: <b>{dateCreation || '-'}</b> &#8226; Last modification on : <b>{dateUpdated || '-'}</b>
			</p>
			<div className={styles.info__details}>
				<div className={ styles.info__column }>
					<TextFieldMockup
						label='ID Store'
						value={ `ID - ${storeDetails?.store?.store_id}` || '' }
						color='rgba(25, 26, 27, 0.5)'
					/>
					<TextFieldMockup
						label='Customer'
						value={ `ID - 
						${storeDetails?.store?.customer_id}
						${storeDetails?.store?.customer?.first_name}
						${storeDetails?.store?.customer?.last_name}
						` || '' }
						color='#0040DD'
					/>
				</div>
				<div className={ styles.info__column }>
					<TextFieldMockup
						label='City'
						value={ `${storeDetails?.store?.address?.city}` || '' }
						color='rgba(25, 26, 27, 0.5)'
					/>
					<TextFieldMockup
						label='Address'
						value={ `${storeAddress}` || '' }
						color='rgba(25, 26, 27, 0.5)'
					/>
				</div>
				<div className={ styles.info__column }>
					{
						storeDetails.store.is_legal &&
						<Label
							background='#1A817B'
							content='HEAD OFFICE'
							width='85px'
							height='21px'
							borderRadius='2px'
							color='#FFFF'
							padding='3px'
							fontSize='11px'
						/>
					}
					<TextFieldMockup
						label='Chief Zone Manager'
						value={ <ul className={ styles.details__list}>
							{ storeChiefs?.map( chief => (
								<li key={ chief.id }>{`ID - ${chief.id} ${chief.first_name} ${chief.last_name}` || ''}</li>
							))}
						</ul>}
						color='#0040DD'
					/>
				</div>
				<div className={ styles.info__actions }>
					<PrimaryButton
						height='34px'
						fontSize = '13px'
						padding = '10px'
						text='Modify'
						background='#E4DAFF'
						color='#8944AB'
						leftIconSrc={PencilIcon}
						onClick={() => setIsEditModalOpen(true)}
					/>
				</div>
			</div>
			<StoreModal
				store={storeDetails?.store}
				setModalIsOpen={setIsEditModalOpen}
				modalIsOpen={isEditModalOpen}
				isEditForm={true}
				customerChiefs={storeDetails.customerChiefs}
				storeChiefs={storeChiefs}
				customerId={storeDetails?.store?.customer_id}
			/>
		</div>
	);
};
