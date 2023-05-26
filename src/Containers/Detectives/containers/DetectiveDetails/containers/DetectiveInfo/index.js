import React, { useState } from 'react';

import DetectiveIcon from '../../../../../../assets/svg/detective.svg';
import PencilIcon from '../../../../../../assets/svg/pencil.svg';
import PrimaryButton from '../../../../../Common/Buttons/PrimaryButton';
import DetectiveModal from '../../../Modals/DetectiveModal';
import styles from './DetectiveInfo.module.scss';

export default ( { detectiveDetails } ) => {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const dateCreation = detectiveDetails?.detective?.created_at &&
		new Date( detectiveDetails?.detective?.created_at ).toLocaleDateString( 'it-IT', {
			'day': '2-digit',
			'month': '2-digit',
			'year': 'numeric'
		} );
	const dateUpdated = detectiveDetails?.detective?.updated_at &&
		new Date( detectiveDetails?.detective?.updated_at ).toLocaleDateString( 'it-IT', {
			'day': '2-digit',
			'month': '2-digit',
			'year': 'numeric',
			'hour': 'numeric',
			'minute': 'numeric',
			'hour12': true
		} );

	return (
		<>
			<DetectiveModal
				isEditForm={true}
				detective={detectiveDetails?.detective}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
			<div className={ styles['customer-info__wrapper'] }>
				<div className={ styles['customer-info__header'] }>
					<h2>{detectiveDetails?.detective?.first_name} {detectiveDetails?.detective?.last_name}</h2>
					<div className={ styles['customer-info__avatar'] }>
						<span>Detective</span>
						<div>
							<img src={DetectiveIcon} alt="avatar"/>
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
							<p>ID Detective</p>
							<div className={styles['transparent__color']}>
								ID - {detectiveDetails?.detective?.id}
							</div>
						</div>
						<div className={styles['description__item']}>
							<p>Name</p>
							<div>{detectiveDetails?.detective?.first_name}</div>
						</div>
						<div className={styles['description__item']}>
							<p>Contacts</p>
							<div className={styles['description__sub-item']}>
								<pre className={styles['transparent__color']}>phone: </pre>
								<p>{detectiveDetails?.detective?.phone}</p>
							</div>
							<div className={styles['description__sub-item']}>
								<pre className={styles['transparent__color']}>email: </pre>
								<p>{detectiveDetails?.detective?.email}</p>
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
							<div>{detectiveDetails?.detective?.last_name}</div>
						</div>
						<div className={styles['description__item']}/>
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
