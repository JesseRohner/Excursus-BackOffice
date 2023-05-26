import clx from 'classnames';
import {
	Field,
	Form, Formik
} from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';

import CloseIcon from '../../../../../../assets/svg/close.svg';
import {ROUTES} from '../../../../../../routes/constants';
import PrimaryButton from '../../../../../Common/Buttons/PrimaryButton';
import SideModal from '../../../../../Common/SideModal';
import TextField from '../../../../../Common/TextField';
import {statusesActions} from '../../../../store';
import styles from './ServiceModal.module.scss';

const ServiceModal = ( {
	                       isEditForm = false,
	                       service = false,
	                       setService,
	                       setIsConfirmRemoveModalOpen
} ) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialValues = {
		id: service?.id || '',
		name: service?.name || '',
	};

	const validationSchema = yup.object().shape({
		name: yup.string('Must be a string').min(2, 'Too Short!').max(255, 'Too Long!').required('required'),
	});

	return ( <SideModal isModalOpen={ service } setIsModalOpen={setService}>
		<Formik
			enableReinitialize
			validationSchema={ validationSchema }
			initialValues={ initialValues }
			onSubmit={ values => {
				if (isEditForm) {
					dispatch( statusesActions.EDIT_PRACTICE_TYPE.REQUEST(values, () => setService(false)) );
				} else {
					const { id, ...service } = values;
					dispatch( statusesActions.CREATE_PRACTICE_TYPE.REQUEST(service, () => setService(false)));
				}
			} }
		>
			{ () => (
				<Form className={ clx( styles['add-customer__form'] ) }>
					<div className={ styles['main-form'] }>
						<div className={ styles.modal__header } onClick={ () => setService( false ) }>
							<img src={ CloseIcon } alt='close' />
						</div>
						<h2 style={{padding: '35px 0'}}>{isEditForm ? 'Edit' : 'New'} Service</h2>
						<Field name='name' id='name'
						       label='Name'
						       placeholder='Service Name'
						       component={ TextField }
						/>
						<div className={styles['submit-btn__wrapper']}>
							<PrimaryButton
								width='100%'
								height='40px'
								text={`${isEditForm ? 'Edit' : 'Create'} Service`}
								type='submit'
								background="#53BA37"
							/>
						</div>
						{
							isEditForm ?
								<div className={styles['submit-btn__wrapper']}>
									<PrimaryButton
										onClick={() => setIsConfirmRemoveModalOpen(true)}
										width='100%'
										height='40px'
										text={'Delete Service'}
										type='button'
										background="red"
									/>
								</div> : null
						}
					</div>
				</Form>
			)}
		</Formik>

	</SideModal> );
};

export default ServiceModal;
