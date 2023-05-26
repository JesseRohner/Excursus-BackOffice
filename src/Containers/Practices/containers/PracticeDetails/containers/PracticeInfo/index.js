import { useState } from 'react';

import PencilIcon from '../../../../../../assets/svg/pencil.svg';
import PrimaryButton from '../../../../../Common/Buttons/PrimaryButton';
import TextFieldMockup from '../../../../../Common/TextFieldMockup';
import AddPracticeModal from '../../../AddPracticeModal';
import styles from './PracticeInfo.module.scss';

export default ( { practiceDetails } ) => {
	const [ isAddPracticeModalOpen, setIsAddPracticeModalOpen ] = useState( false );

	const dateCreation = practiceDetails?.created_at &&
		new Date( practiceDetails?.created_at ).toLocaleDateString( 'it-IT', {
			'day': '2-digit',
			'month': '2-digit',
			'year': 'numeric'
		} );
	const dateUpdated = practiceDetails?.updated_at &&
		new Date( practiceDetails?.updated_at ).toLocaleDateString( 'it-IT', {
			'day': '2-digit',
			'month': '2-digit',
			'year': 'numeric',
			'hour': 'numeric',
			'minute': 'numeric',
			'hour12': true
		} );

	return (
		<div className={styles['practice__info-block']}>
			<p className={styles['info__dates']}>
				Added on: <b>{dateCreation || '-'}</b> &#8226; Last modification on : <b>{dateUpdated || '-'}</b>
			</p>
			<div className={styles.info__details}>
				<div className={ styles.info__column }>
					<TextFieldMockup
						label='ID Practice'
						value={ practiceDetails?.id || '' }
						color='rgba(25, 26, 27, 0.5)'
					/>
					<TextFieldMockup
						label='Detective'
						value={ <ul className={ styles.details__list}>
							{ practiceDetails?.detectives?.map( detective => (
								<li key={ detective.detective_id }>ID-{ detective.detective_id || '' }</li>
							))}
						</ul>}
						color='#0040DD'
					/>
				</div>
				<div className={ styles.info__column }>
					<TextFieldMockup
						label='Customer'
						value={ `ID-${practiceDetails?.customer?.customer_id || ''}` }
						color='#0040DD'
					/>
					<TextFieldMockup
						label='Store'
						value={ <ul className={ styles.details__list}>
							{ practiceDetails?.stores?.map( store => (
								<li key={ store.store_id }>ID-{ store.store_id || '' }</li>
							))}
						</ul>}
						color='#0040DD'
					/>
				</div>
				<div className={ styles.info__column }>
					<TextFieldMockup
						label='Practice Title'
						value={ practiceDetails?.title || ''}
						color='#2E3338'
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
						onClick={() => setIsAddPracticeModalOpen(true)}
					/>
				</div>
			</div>
			<AddPracticeModal
				isAddPracticeModalOpen={ isAddPracticeModalOpen }
				setIsAddPracticeModalOpen={ setIsAddPracticeModalOpen }
				isEditForm={ true }
				title='Modify Practice'
				practiceId={ practiceDetails?.id}
				editFormInitialValues={ {
					title: practiceDetails?.title || '',
					description: practiceDetails?.description,
					type_ids: practiceDetails?.types?.map(type => type?.id),
					customer_id: practiceDetails?.customer?.customer_id,
					store_ids: practiceDetails?.stores.map(store => store.store_id),
					detective_ids: practiceDetails?.detectives.map(detective => detective.detective_id),
				}}
			/>
		</div>
	);
};
