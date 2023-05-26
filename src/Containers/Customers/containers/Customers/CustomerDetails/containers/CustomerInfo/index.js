import React, {useState} from 'react';

import CustomerIcon from '../../../../../../../assets/svg/customer.svg';
import PencilIcon from '../../../../../../../assets/svg/pencil.svg';
import PrimaryButton from '../../../../../../Common/Buttons/PrimaryButton';
import CustomersModal from '../../../Modals/CustomersModal';
import styles from './CustomerInfo.module.scss';

export default ({customer}) => {
	const dateCreation = customer?.created_at &&
		new Date( customer?.created_at ).toLocaleDateString( 'it-IT', {
			'day': '2-digit',
			'month': '2-digit',
			'year': 'numeric'
		} );
	const dateUpdated = customer?.updated_at &&
		new Date( customer?.updated_at ).toLocaleDateString( 'it-IT', {
			'day': '2-digit',
			'month': '2-digit',
			'year': 'numeric',
			'hour': 'numeric',
			'minute': 'numeric',
			'hour12': true
		} );
	const [modalIsOpen, setModalIsOpen] = useState(false);
	return (
		<>
			<CustomersModal
				isCustomerModalOpen={ modalIsOpen }
				setIsCustomerModalOpen={setModalIsOpen}
				isEditForm={true}
				customer={customer}
			/>
			<div className={ styles['customer-info__wrapper'] }>
				<div className={ styles['customer-info__header'] }>
					<h2>{customer.first_name} {customer.last_name}</h2>
					<div className={ styles['customer-info__avatar'] }>
						<span>Customer</span>
						<div>
							<img src={CustomerIcon} alt="avatar"/>
						</div>
					</div>
				</div>
				<div className={styles['customer__info-block']}>
					<p className={styles['info__dates']}>
						Added on: <b>{dateCreation || '-'}</b> &#8226; Last modification on : <b>{dateUpdated || '-'}</b>
					</p>
				</div>
				<div className={styles['customer-info__description']}>
					<div className={styles['description__row']}>
						<div className={styles['description__item']}>
							<p>ID Customer</p>
							<div className={styles['transparent__color']}>
									ID - {customer.id}
							</div>
						</div>
						<div className={styles['description__item']}>
							<p>Name</p>
							<div>{customer.first_name}</div>
						</div>
						<div className={styles['description__item']}>
							<p>Contacts</p>
							<div className={styles['description__sub-item']}>
								<pre className={styles['transparent__color']}>phone: </pre>
								<p>{customer.phone}</p>
							</div>
							<div className={styles['description__sub-item']}>
								<pre className={styles['transparent__color']}>email: </pre>
								<p>{customer.email}</p>
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
							<div>{customer.last_name}</div>
						</div>
						<div className={styles['description__item']}>
							<p>Discount</p>
							<div>{customer.discount}%</div>
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
							onClick={() => setModalIsOpen(true)}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
