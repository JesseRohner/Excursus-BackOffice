import clx from 'classnames';
import {
	Field, FieldArray,
	Form, Formik
} from 'formik';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import * as yup from 'yup';

import CloseIcon from '../../../../../../assets/svg/close.svg';
import PlusIcon from '../../../../../../assets/svg/plus-circle.svg';
import LabeledButton from '../../../../../Common/Buttons/LabeledButton';
import PrimaryButton from '../../../../../Common/Buttons/PrimaryButton';
import CheckboxField from '../../../../../Common/CheckboxField';
import SideModal from '../../../../../Common/SideModal';
import Switcher from '../../../../../Common/Switcher';
import TextField from '../../../../../Common/TextField';
import {FORM_LISTS} from '../../../../../Practices/containers/AddPracticeModal/constants';
import FormSideContent from '../../../../../Practices/containers/AddPracticeModal/containers/FormSideContent';
import {customerActions} from '../../../../store';
import styles from './StoreModal.module.scss';



const StoreModal = ({
	                    customerId,
	                    customerChiefs,
	                    store = {},
	                    isEditForm = false,
	                    setModalIsOpen,
	                    storeChiefs,
	                    modalIsOpen
}) => {
	const dispatch = useDispatch();
	const initialValuesForCreate = {
		customer_id: customerId,
		name: '',
		country: '',
		city: '',
		street: '',
		apartment: '',
		building_number: '',
		lat: '',
		lng: '',
		is_legal: false,
		chief_ids: [],
	};

	const initialValuesForEdit = {
		customer_id: customerId,
		store_id: store?.store_id || '',
		name: store?.name || '',
		country: store?.address?.country || '',
		city: store?.address?.city || '',
		street: store?.address?.street || '',
		apartment: store?.address?.apartment || '',
		building_number: store?.address?.building_number || '',
		lat: store?.address?.lat || '',
		lng: store?.address?.lng || '',
		is_legal: Boolean(store?.is_legal),
		chief_ids: storeChiefs?.length ? storeChiefs.map(chief => chief.id) : [],
	};

	const [ activeList, setActiveList ] = useState( false );
	const validationSchema = yup.object().shape({
		name: yup.string('Must be a string').required('required'),
		country: yup.string('Must be a string').required('required'),
		city: yup.string('Must be a string').required('required'),
		street: yup.string('Must be a string').required('required'),
		building_number: yup.string('Must be a string').required('required'),
		apartment: yup.string('Must be a string'),
		lat: yup.number().typeError('Must be a number')
			.test('latitude', 'Latitude must have value like "XX.XXXXXX"', val => {
				const [first, second] = String(val)?.split('.');
				return !!(first && second && first.length <= 4 && second.length <= 6);
			}),
		lng: yup.number().typeError('Must be a number')
			.test('longitude', 'Longitude must have value like "XX.XXXXXX"', val => {
				const [first, second] = String(val)?.split('.');
				return !!(first && second && first.length <= 4 && second.length <= 6);
			}),
		chief_ids: yup.array()
	});

	return (
		<SideModal isModalOpen={modalIsOpen} setIsModalOpen={setModalIsOpen}>
			<Formik
				enableReinitialize
				initialValues={isEditForm ? initialValuesForEdit : initialValuesForCreate}
				validationSchema={validationSchema}
				onSubmit={values => {
					if (isEditForm) {
						const {
							name,
							chief_ids,
							customer_id,
							is_legal,
							store_id,
							...address
						} = values;
						dispatch(customerActions.EDIT_STORE.REQUEST({
							name,
							customer_id,
							chief_ids,
							is_legal,
							store_id,
							address
						}, () => setModalIsOpen(false)));
					} else {
						const {
							name,
							chief_ids,
							customer_id,
							is_legal,
							...address
						} = values;
						dispatch(customerActions.CREATE_STORE.REQUEST({
							name,
							customer_id,
							chief_ids,
							is_legal,
							address
						}, () => setModalIsOpen(false)));
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
						{ activeList && <FormSideContent
							formValues={ values }
							errors={ errors }
							touched={ touched }
							setFieldTouched={setFieldTouched}
							activeList={ activeList }
							setActiveList={ setActiveList }
							setFieldValue={ setFieldValue }
							chiefs={customerChiefs}
						/> }
						<div className={styles['main-form']}>
							<div className={styles.modal__header} onClick={() => setModalIsOpen(false)}>
								<img src={CloseIcon} alt='close'/>
							</div>
							<h2 style={{padding: '35px 0'}}>{isEditForm ? 'Edit' : 'New'} Store</h2>
							<Field name='name' id='name'
								       label='Name'
								       placeholder='Store name'
								       component={TextField}
							/>
							<Field name='country' id='country'
								       label='Contacts'
								       component={TextField}
								       placeholder='Country'
							/>
							<Field name='city' id='city'
								       component={TextField}
								       placeholder='City'
							/>
							<Field name='street' id='street'
								       component={TextField}
								       placeholder='Street'
							/>
							<Field name='building_number' id='building_number'
								       component={TextField}
								       placeholder='Building number'
							/>
							<Field name='apartment' id='apartment'
								       placeholder='Apartment'
								       component={TextField}
							/>
							<Field name='lat' id='lat'
								       component={TextField}
								       placeholder='Lat'
							/>
							<Field name='lng' id='lng'
								       component={TextField}
								       placeholder='Lng'
							/>
							<Switcher
								value={values.is_legal}
								setValue={value => setFieldValue('is_legal', value)}
								label={'Head Office'}
							/>
							<div className={ styles['form-field__wrapper'] }>
								<LabeledButton
									text='Add Chief'
									onClick={ () => {
										if ( activeList === FORM_LISTS.CHIEF ) {
											setActiveList(false);
										} else {
											setActiveList( FORM_LISTS.CHIEF );
										}
									} }
									isActive={ activeList === FORM_LISTS.CHIEF }
									label='Chief'
									isError={ touched.chief_ids && errors.chief_ids }
								/>
								{ values.chief_ids.length ?
									<FieldArray
										name="chief_ids"
										render={ arrayHelpers => (
											<div className={ styles['selected-values'] }>
												{ values.chief_ids.map( chiefId => {
													const chiefInfo = customerChiefs.find( chief =>
														chief.id === chiefId );

													return (
														<CheckboxField
															isSelected={true}
															key={ chiefId }
															label={`${chiefInfo.first_name} ${chiefInfo.last_name}`}
															onChange={ e => {
																const idx = values.chief_ids.indexOf( chiefId );
																arrayHelpers.remove( idx );
																setFieldTouched('chief_ids', true);
															} }
															value={ chiefId }
															checked={ values.chief_ids.includes( chiefId ) }
														/>
													);
												}) }
											</div>
										)}
									/> :
									null}
							</div>
							<div className={styles['submit-btn__wrapper']}>
								<PrimaryButton
									width='100%'
									height='40px'
									text={`${isEditForm ? 'Edit' : 'Create'} Store`}
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

export default StoreModal;
