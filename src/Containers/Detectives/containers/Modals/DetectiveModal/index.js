import clx from 'classnames';
import {
	Field,
	Form, Formik
} from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import CloseIcon from '../../../../../assets/svg/close.svg';
import {ROUTES} from '../../../../../routes/constants';
import PrimaryButton from '../../../../Common/Buttons/PrimaryButton';
import SideModal from '../../../../Common/SideModal';
import TextField from '../../../../Common/TextField';
import {detectiveActions} from '../../../store';
import {createValidationSchema, editValidationSchema} from './constants';
import styles from './DetectiveModal.module.scss';

const DetectiveModal = ( {
	                        isModalOpen,
	                        setIsModalOpen,
	                        isEditForm = false,
	                        detective = {}
} ) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const initialValuesForCreate = {
		first_name: '',
		last_name: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
	};

	const initialValuesForEdit = {
		id: detective.id,
		first_name: detective.first_name || '',
		last_name: detective.last_name || '',
		phone: detective.phone || '',
		email: detective.email || '',
		password: '',
		confirmPassword: '',
	};

	const createCustomerCallback = id => {
		setIsModalOpen(false);
		navigate(`${ROUTES.DETECTIVES}/${id}`);
	};

	return ( <SideModal isModalOpen={ isModalOpen } setIsModalOpen={setIsModalOpen}>
		<Formik
			enableReinitialize
			validationSchema={ isEditForm ? editValidationSchema : createValidationSchema }
			initialValues={ isEditForm ? initialValuesForEdit : initialValuesForCreate }
			onSubmit={ values => {
				if (isEditForm) {
					const {
						confirmPassword,
						email,
						...detective
					} = values;
					dispatch( detectiveActions.EDIT_DETECTIVE.REQUEST(detective, () => setIsModalOpen(false)) );
				} else {
					const {
						confirmPassword,
						...detective
					} = values;
					dispatch( detectiveActions.CREATE_DETECTIVE.REQUEST(detective, createCustomerCallback) );
				}
			} }
		>
			{ () => (
				<Form className={ clx( styles['add-customer__form'] ) }>
					<div className={ styles['main-form'] }>
						<div className={ styles.modal__header } onClick={ () => setIsModalOpen( false ) }>
							<img src={ CloseIcon } alt='close' />
						</div>
						<h2 style={{padding: '35px 0'}}>{isEditForm ? 'Edit' : 'New'} Detective</h2>
						<Field name='first_name' id='first_name'
									 label='Name'
									 placeholder='Detective name'
									 component={ TextField }
						/>
						<Field name='last_name' id='last_name'
									 label='Surname'
									 component={ TextField }
									 placeholder='Detective surname'
						/>
						<Field name='email' id='email'
						       label='Email'
						       type='email'
						       component={TextField}
						       placeholder='@ email'
						       disabled={isEditForm}
						/>
						<Field name='phone' id='phone'
						       label='Phone'
						       component={TextField}
						       placeholder='+39 phone'
						/>
						<Field name='password' id='password'
									 label='Password'
									 type='password'
									 component={ TextField }
									 placeholder='Password'
						/>
						<Field name='confirmPassword' id='confirmPassword'
									 label='Confirm password'
									 type='password'
									 component={ TextField }
									 placeholder='Confirm password'
						/>
						<div className={styles['submit-btn__wrapper']}>
							<PrimaryButton
								width='100%'
								height='40px'
								text={`${isEditForm ? 'Edit' : 'Create'} Detective`}
								type='submit'
								background="#53BA37"
							/>
						</div>
					</div>
				</Form>
			)}
		</Formik>

	</SideModal> );
};

export default DetectiveModal;
