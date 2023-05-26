import React, { useState } from 'react';

import ChiefIcon from '../../../../../../../assets/svg/chief.svg';
import PencilIcon from '../../../../../../../assets/svg/pencil.svg';
import PrimaryButton from '../../../../../../Common/Buttons/PrimaryButton';
import Label from '../../../../../../Common/Label';
import ChiefModal from '../../../Modals/ChiefModal';
import styles from './ChiefInfo.module.scss';

export default ( { chiefDetails } ) => {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const dateCreation = chiefDetails?.chief?.created_at &&
		new Date( chiefDetails?.chief?.created_at ).toLocaleDateString( 'it-IT', {
			'day': '2-digit',
			'month': '2-digit',
			'year': 'numeric'
		} );
	const dateUpdated = chiefDetails?.chief?.updated_at &&
		new Date( chiefDetails?.chief?.updated_at ).toLocaleDateString( 'it-IT', {
			'day': '2-digit',
			'month': '2-digit',
			'year': 'numeric',
			'hour': 'numeric',
			'minute': 'numeric',
			'hour12': true
		} );

	return (
		<>
			<ChiefModal
				customerId={chiefDetails?.chief?.customer}
				isEditForm={true}
				chief={chiefDetails?.chief}
				customerStores={chiefDetails.customerStores}
				stores={chiefDetails.stores}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
			<div className={ styles['customer-info__wrapper'] }>
				<div className={ styles['customer-info__header'] }>
					<h2>{chiefDetails?.chief?.first_name} {chiefDetails?.chief?.last_name}</h2>
					<div className={ styles['customer-info__avatar'] }>
						<span>Chief Zone Manager</span>
						<div>
							<img src={ChiefIcon} alt="avatar"/>
						</div>
					</div>
				</div>
				<div className={styles['practice__info-block']}>
					<p className={styles['info__dates']}>
						Added on: <b>{dateCreation || '-'}</b> &#8226; Last modification on : <b>{dateUpdated || '-'}</b>
					</p>
				</div>
				<div className={styles['customer-info__description']}>
					<div className={styles['description__row']}>
						<div className={styles['description__item']}>
							<p>ID Chief Zone Manager</p>
							<div className={styles['transparent__color']}>
								ID - {chiefDetails?.chief?.id}
							</div>
						</div>
						<div className={styles['description__item']}>
							<p>Name</p>
							<div>{chiefDetails?.chief?.first_name}</div>
						</div>
						<div className={styles['description__item']}>
							<p>Contacts</p>
							<div className={styles['description__sub-item']}>
								<pre className={styles['transparent__color']}>phone: </pre>
								<p>{chiefDetails?.chief?.phone}</p>
							</div>
							<div className={styles['description__sub-item']}>
								<pre className={styles['transparent__color']}>email: </pre>
								<p>{chiefDetails?.chief?.email}</p>
							</div>
						</div>
					</div>
					<div className={styles['description__row']}>
						<div className={styles['description__item']}>
							<p>Password</p>
							<div>*****************</div>
						</div>
						<div className={styles['description__item']}>
							<p>Surname</p>
							<div>{chiefDetails?.chief?.last_name}</div>
						</div>
						<div className={styles['description__item']}>
							{
								chiefDetails?.chief?.is_buyer &&
								<Label
									background='#F5E23D'
									content='BUYER'
									width='55px'
									height='21px'
									borderRadius='2px'
									color='#2E3338'
									padding='3px'
									fontSize='11px'
								/>
							}
						</div>
					</div>
					<div className={styles['description__actions']}>
						<PrimaryButton
							height='34px'
							fontSize = '13px'
							padding = '8px 10px'
							text='Modify'
							background='#E4DAFF'
							color='#8944AB'
							leftIconSrc={PencilIcon}
							onClick={() => setIsModalOpen(true)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
