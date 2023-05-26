import clx from 'classnames';
import {
	Field, FieldArray,
	Form, Formik
} from 'formik';
import React, { useState } from 'react';
import {useDispatch} from 'react-redux';

import CloseIcon from '../../../../../../assets/svg/close.svg';
import LabeledButton from '../../../../../Common/Buttons/LabeledButton';
import PrimaryButton from '../../../../../Common/Buttons/PrimaryButton';
import CheckboxField from '../../../../../Common/CheckboxField';
import SideModal from '../../../../../Common/SideModal';
import Switcher from '../../../../../Common/Switcher';
import TextField from '../../../../../Common/TextField';
import {FORM_LISTS} from '../../../../../Practices/containers/AddPracticeModal/constants';
import FormSideContent from '../../../../../Practices/containers/AddPracticeModal/containers/FormSideContent';
import {customerActions} from '../../../../store';
import styles from './ChiefModal.module.scss';
import {createValidationSchema, editValidationSchema} from './constants';


const ChiefModal = ({
	                    customerId,
	                    stores, chief = {},
	                    isModalOpen,
	                    setIsModalOpen,
	                    customerStores,
	                    isEditForm = false,
}) => {
	const dispatch = useDispatch();

	const initialValuesForCreate = {
		customer_id: customerId,
		first_name: '',
		last_name: '',
		phone: '',
		email: '',
		password: '',
		confirmPassword: '',
		is_buyer: false,
		store_ids: [],
	};
	const initialValuesForEdit = {
		customer_id: customerId,
		chief_id: chief.id,
		first_name: chief.first_name || '',
		last_name: chief.last_name || '',
		phone: chief.phone || '',
		email: chief.email || '',
		password: '',
		confirmPassword: '',
		is_buyer: Boolean(chief.is_buyer),
		store_ids: stores?.length ? stores.map(store => store.store_id) : [],
	};
	const [activeList, setActiveList] = useState(false);
	return (
		<SideModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
			<Formik
				enableReinitialize
				initialValues={isEditForm ? initialValuesForEdit : initialValuesForCreate}
				validationSchema={isEditForm ? editValidationSchema : createValidationSchema}
				onSubmit={values => {
					if (isEditForm) {
						const {
							confirmPassword,
							email,
							...chief
						} = values;
						dispatch( customerActions.EDIT_CHIEF.REQUEST(chief, () => setIsModalOpen(false)));
					} else {
						const {confirmPassword, ...chief} = values;
						dispatch(customerActions.CREATE_CHIEF.REQUEST(chief, () => setIsModalOpen(false)));
					}
				}}
			>
				{({
					  values,
					  touched,
					  errors,
					  setFieldTouched,
					  setFieldValue
				  }) => (
					<Form className={clx(styles['add-customer__form'])}>
						{activeList && <FormSideContent
							formValues={values}
							errors={errors}
							touched={touched}
							setFieldTouched={setFieldTouched}
							activeList={activeList}
							setActiveList={setActiveList}
							setFieldValue={setFieldValue}
							customerStores={customerStores}
						/>}
						<div className={styles['main-form']}>
							<div className={styles.modal__header} onClick={() => setIsModalOpen(false)}>
								<img src={CloseIcon} alt='close'/>
							</div>
							<h2 style={{padding: '35px 0'}}>{isEditForm ? 'Edit' : 'New'} Chief</h2>
							<Field name='first_name' id='first_name'
							       label='Name'
							       placeholder='Chief name'
							       component={TextField}
							/>
							<Field name='last_name' id='last_name'
							       label='Surname'
							       component={TextField}
							       placeholder='Chief surname'
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
							<Switcher
								value={values.is_buyer}
								setValue={value => setFieldValue('is_buyer', value)}
								label={'Buyer'}
							/>
							<div className={styles['form-field__wrapper']}>
								<LabeledButton
									text='Add Store'
									onClick={() => {
										if (activeList === FORM_LISTS.STORES) {
											setActiveList(false);
										} else {
											setActiveList(FORM_LISTS.STORES);
										}
									}}
									isActive={activeList === FORM_LISTS.STORES}
									label='Store'
									isError={touched.store_ids && errors.store_ids}
								/>
								{values.store_ids.length ?
									<FieldArray
										name="store_ids"
										render={arrayHelpers => (
											<div className={styles['selected-values']}>
												{values.store_ids.map(storeId => {
													const storeInfo = customerStores?.find(store =>
														store.store_id === storeId);

													return (
														<CheckboxField
															isSelected={true}
															key={storeId}
															label={storeInfo.name}
															onChange={e => {
																const idx = values.store_ids.indexOf(storeId);
																arrayHelpers.remove(idx);
																setFieldTouched('store_ids', true);
															}}
															value={storeId}
															checked={values.store_ids.includes(storeId)}
														/>
													);
												})}
											</div>
										)}
									/> :
									null}
							</div>
							<Field name='password' id='password'
							       label='Password'
							       type='password'
							       component={TextField}
							       placeholder='Password'
							/>
							<Field name='confirmPassword' id='confirmPassword'
							       label='Confirm password'
							       type='password'
							       component={TextField}
							       placeholder='Confirm password'
							/>
							<div className={styles['submit-btn__wrapper']}>
								<PrimaryButton
									width='100%'
									height='40px'
									text={`${isEditForm ? 'Edit' : 'New'} Chief`}
									type='submit'
									background="#53BA37"
								/>
							</div>
						</div>
					</Form>
				)}
			</Formik>

		</SideModal>
	);
};

export default ChiefModal;
