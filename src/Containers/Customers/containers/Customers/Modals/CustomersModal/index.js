import clx from 'classnames';
import {
	Field,
	Form, Formik
} from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import CloseIcon from '../../../../../../assets/svg/close.svg';
import {ROUTES} from '../../../../../../routes/constants';
import PrimaryButton from '../../../../../Common/Buttons/PrimaryButton';
import SideModal from '../../../../../Common/SideModal';
import TextField from '../../../../../Common/TextField';
import { customerActions } from '../../../../store';
import {createValidationSchema, editValidationSchema} from './constants';
import styles from './CustomerModal.module.scss';

const CustomerModal = ( {
	                        isCustomerModalOpen,
	                        setIsCustomerModalOpen,
	                        isEditForm = false,
	                        customer = {}
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
		discount: '',
	};

	const initialValuesForEdit = {
		id: customer.id,
		first_name: customer.first_name || '',
		last_name: customer.last_name || '',
		phone: customer.phone || '',
		email: customer.email || '',
		password: '',
		confirmPassword: '',
		discount: customer.discount || '',
	};

	const createCustomerCallback = id => {
		setIsCustomerModalOpen(false);
		navigate(`${ROUTES.CUSTOMERS}/${id}`);
	};

	return ( <SideModal isModalOpen={ isCustomerModalOpen } setIsModalOpen={setIsCustomerModalOpen}>
		<Formik
			enableReinitialize
			validationSchema={ isEditForm ? editValidationSchema : createValidationSchema }
			initialValues={ isEditForm ? initialValuesForEdit : initialValuesForCreate }
			onSubmit={ values => {
				if (isEditForm) {
					const {
						confirmPassword,
						email,
						...customer
					} = values;
					dispatch( customerActions.EDIT_CUSTOMER.REQUEST(customer, () => setIsCustomerModalOpen(false)) );
				} else {
					const {
						confirmPassword,
						...customer
					} = values;
					dispatch( customerActions.CREATE_CUSTOMER.REQUEST(customer, createCustomerCallback) );
				}
			} }
		>
			{ () => (
				<Form className={ clx( styles['add-customer__form'] ) }>
					<div className={ styles['main-form'] }>
						<div className={ styles.modal__header } onClick={ () => setIsCustomerModalOpen( false ) }>
							<img src={ CloseIcon } alt='close' />
						</div>
						<h2 style={{padding: '35px 0'}}>{isEditForm ? 'Edit' : 'New'} Customer</h2>
						<Field name='first_name' id='first_name'
									 label='Name'
									 placeholder='Customer name'
									 component={ TextField }
						/>
						<Field name='last_name' id='last_name'
									 label='Surname'
									 component={ TextField }
									 placeholder='Customer surname'
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
						<Field name='discount' id='discount'
									 label='Discount'
									 component={ TextField }
									 placeholder='%'
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
								text={`${isEditForm ? 'Edit' : 'New'} Customer`}
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

export default CustomerModal;
