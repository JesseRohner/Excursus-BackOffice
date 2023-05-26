import clx from 'classnames';
import {
	Field, FieldArray,
	Form, Formik
} from 'formik';
import React, {
	useEffect, useRef, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '../../../../assets/svg/close.svg';
import EyeIcon from '../../../../assets/svg/eye.svg';
import { ROUTES } from '../../../../routes/constants';
import LabeledButton from '../../../Common/Buttons/LabeledButton';
import PrimaryButton from '../../../Common/Buttons/PrimaryButton';
import CheckboxField from '../../../Common/CheckboxField';
import FilePreviewBlock from '../../../Common/FilePreviewBlock';
import SideModal from '../../../Common/SideModal';
import TextField from '../../../Common/TextField';
import { practiceActions } from '../../store';
import { getCustomerStores, getInfoForPracticeCreation } from '../../store/selectors';
import styles from './AddPracticeModal.module.scss';
import {
	FORM_LISTS, INITIAL_VALUES,
	VALIDATION_SCHEMA_ADD_FORM,
	VALIDATION_SCHEMA_EDIT_FORM
} from './constants';
import FormSideContent from './containers/FormSideContent';

const AddPracticeModal = ( {
	isAddPracticeModalOpen,
	setIsAddPracticeModalOpen,
	isEditForm = false,
	title = false,
	editFormInitialValues = false,
	practiceId,
} ) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const addPracticeModalRef = useRef();

	const [ activeList, setActiveList ] = useState( false );
	const infoForPracticeCreation = useSelector( getInfoForPracticeCreation() );
	const customerStores = useSelector( getCustomerStores() );
	const [ filesInfo, setFilesInfo ] = useState( [] );
	const [ isFileFullSize, setIsFileFullSize ] = useState( false );

	useEffect( () => {
		dispatch( practiceActions.GET_INFO_FOR_PRACTICE_CREATION.REQUEST() );
	}, [ dispatch ] );

	useEffect( () => {
		if ( isEditForm ) {
			dispatch( practiceActions.GET_CUSTOMER_STORES.REQUEST( editFormInitialValues?.customer_id ) );
		}
	}, [isEditForm, dispatch, editFormInitialValues]);

	return (
		<SideModal isModalOpen={ isAddPracticeModalOpen } setIsModalOpen={ setIsAddPracticeModalOpen }
			width={isFileFullSize && '100%'}
		>
			<Formik
				enableReinitialize
				initialValues={isEditForm ? editFormInitialValues : INITIAL_VALUES }
				validationSchema={ isEditForm ? VALIDATION_SCHEMA_EDIT_FORM : VALIDATION_SCHEMA_ADD_FORM }
				innerRef={ addPracticeModalRef }
				onSubmit={ values => {
					if ( isEditForm ) {
						dispatch( practiceActions.EDIT_PRACTICE.REQUEST( {
							id: practiceId,
							...values
						}, () => setIsAddPracticeModalOpen(false)));
					} else if ( +values?.document?.type_id === 3 ) {
						console.log('videos', filesInfo?.map(file => file?.url));
					} else {
						dispatch( practiceActions.ADD_PRACTICE.REQUEST( {
							...values,
							document: { ...values.document, imagesInBase64: filesInfo?.map(file => file?.url) }
						},
						id => {
							setIsAddPracticeModalOpen( false );
							navigate(`${ROUTES.PRACTICES}/${id}`);
						}) );
					}
				} }
			>
				{ ( {
					errors, touched, values, submitForm, setFieldValue, isValid, setFieldTouched
				} ) => {
					const addedCustomer = infoForPracticeCreation?.customers?.find( customer => +customer.id === +values.customer_id );

					return (
						<Form className={ styles['add-practice__form'] }>
							{
								isFileFullSize && <FilePreviewBlock
									isFileFullSize={ isFileFullSize }
									setIsFileFullSize={setIsFileFullSize }
								/>
							}
							{ activeList && <FormSideContent
								infoForPracticeCreation={ infoForPracticeCreation }
								formValues={ values }
								errors={ errors }
								touched={ touched }
								setFieldTouched={setFieldTouched}
								activeList={ activeList }
								setActiveList={ setActiveList }
								setFieldValue={ setFieldValue }
								setFilesInfo={ setFilesInfo }
								filesInfo={filesInfo}
								isFileFullSize={ isFileFullSize }
								setIsFileFullSize={ setIsFileFullSize }
								customerStores={ customerStores }
							/> }
							<div className={ styles['main-form'] }>
								<div className={ styles.modal__header } onClick={ () => {
									setActiveList( false );
									setIsAddPracticeModalOpen( false );
								}}>
									<img src={ CloseIcon } alt='close' />
								</div>
								{ title && <h2 className={styles.modal__title}>{title}</h2>}
								<div className={styles['form-field__wrapper']}>
									<Field name='title' id='title'
										placeholder='Title'
										label='Title'
										component={ TextField }
									/>
								</div>
								<div className={ styles['form-field__wrapper'] }>
									<LabeledButton text='Add Type'
										onClick={ () => {
											if ( activeList === FORM_LISTS.PRACTICE_TYPES ) {
												setActiveList(false);
											} else {
												setActiveList( FORM_LISTS.PRACTICE_TYPES );
											}
										} }
										isActive={ activeList === FORM_LISTS.PRACTICE_TYPES }
										label='Type of practice'
										isError={touched.type_ids && errors.type_ids}
									/>
									{ values.type_ids.length ?
										<FieldArray
											name="type_ids"
											render={ arrayHelpers => (
												<div className={ styles['selected-values'] }>
													{ values.type_ids.map( type => (
														<CheckboxField
															isSelected={true}
															key={ type }
															label={
																infoForPracticeCreation?.practiceTypes?.find( pType =>
																	pType.id === type )?.name
															}
															onChange={ e => {
																const idx = values.type_ids.indexOf( type );
																arrayHelpers.remove( idx );
																setFieldTouched('type_ids', true);
															} }
															value={ type }
															checked={ values.type_ids.includes( type ) }
														/>
													) ) }
												</div>
											) }
										/> :
										null}
								</div>
								<div className={ styles['form-field__wrapper'] }>
									<LabeledButton
										text={ addedCustomer ?
											(
												<div className={ styles['value__label'] }>
													<div className={styles['value__info']}>
														<span className={styles['value__fullname']}>
															{ addedCustomer?.first_name } { addedCustomer?.last_name }
														</span>
														<span className={styles['value__id']}>ID-{ addedCustomer?.id }</span>
													</div>
													<span className={'checked__btn'} onClick={ e => {
														e.preventDefault();
														e.stopPropagation();
														setFieldValue( 'customer_id', '' );
													}
													}/>
												</div>
											) :
											'Add Customer' }
										onClick={ () => {
											if ( activeList === FORM_LISTS.CUSTOMERS ) {
												setActiveList(false);
											} else {
												setActiveList( FORM_LISTS.CUSTOMERS );
											}
										} }
										isActive={ activeList === FORM_LISTS.CUSTOMERS }
										label='Customer'
										isError={ touched?.customer_id && errors.customer_id }
										height={addedCustomer && 'auto'}
									/>
								</div>
								<div className={ styles['form-field__wrapper'] }>
									<LabeledButton
										text='Add Store'
										onClick={ () => {
											if ( activeList === FORM_LISTS.STORES ) {
												setActiveList(false);
											} else {
												setActiveList( FORM_LISTS.STORES );
											}
										} }
										isActive={ activeList === FORM_LISTS.STORES }
										label='Store'
										isError={ touched.store_ids && errors.store_ids }
										disabled={!values.customer_id || !customerStores?.length}
									/>
									{ values.store_ids.length ?
										<FieldArray
											name="store_ids"
											render={ arrayHelpers => (
												<div className={ styles['selected-values'] }>
													{ values.store_ids.map( storeId => {
														const storeInfo = customerStores.find( store => +store.store_id === +storeId );

														return (
															<CheckboxField
																isSelected={true}
																key={ storeId }
																label={storeInfo?.name}
																onChange={ e => {
																	const idx = values.store_ids.indexOf( storeId );
																	arrayHelpers.remove( idx );
																	setFieldTouched('store_ids', true);
																} }
																value={ storeId }
																checked={ values.store_ids.includes( storeId ) }
															/>
														);
													}) }
												</div>
											)}
										/> :
										null}
								</div>
								<div className={ styles['form-field__wrapper'] }>
									<LabeledButton text='Add Detective'
										onClick={ () => {
											if ( activeList === FORM_LISTS.DETECTIVES ) {
												setActiveList(false);
											} else {
												setActiveList( FORM_LISTS.DETECTIVES );
											}
										} }
										isActive={ activeList === FORM_LISTS.DETECTIVES }
										label='Detective'
										isError={touched.detective_ids && errors.detective_ids}
									/>
									{ values.detective_ids.length ?
										<FieldArray
											name="detective_ids"
											render={ arrayHelpers => (
												<div className={ styles['selected-values'] }>
													{ values.detective_ids.map( detectiveId => {
														const detectiveInfo = infoForPracticeCreation?.detectives?.find( detective =>
															detective.id === detectiveId );

														return (
															<CheckboxField
																isSelected={true}
																key={ detectiveId }
																label={ <span className={styles['value__info']}>
																	<span className={styles['value__fullname']}>
																		{ detectiveInfo.first_name } { detectiveInfo.last_name }
																	</span>
																	<span className={styles['value__id']}>ID-{ detectiveInfo.id }</span>
																</span> }
																onChange={ e => {
																	const idx = values.detective_ids.indexOf( detectiveId );
																	arrayHelpers.remove( idx );
																	setFieldTouched('detective_ids', true);
																} }
																value={ detectiveId }
																checked={ values.detective_ids.includes( detectiveId ) }
															/>
														);
													}) }
												</div>
											)}
										/> :
										null}
								</div>
								{ !isEditForm && <div className={ styles['form-field__wrapper'] }>
									<LabeledButton text='Attached Document'
										onClick={ () => {
											if ( activeList === FORM_LISTS.DOCUMENTS ) {
												setActiveList( false );
											} else {
												setActiveList( FORM_LISTS.DOCUMENTS );
											}
										} }
										isActive={ activeList === FORM_LISTS.DOCUMENTS }
										label='Document'
										isError={ ( touched?.document?.description || touched?.document?.type_id ) &&
											( errors?.document?.description || errors?.document?.type_id || !filesInfo?.length )
										}
									/>

									{ filesInfo?.length ?
										<div className={ styles['selected-values'] }>
											{ filesInfo.map( image => (
												<div key={ image?.name } className={ clx( styles['value__details'] ) }>
													<span>{ image?.name }</span>
													<img src={ EyeIcon } alt='full screen'
														onClick={ () => setIsFileFullSize( image?.url ) } />
												</div>
											) ) }
										</div> :
										null }
								</div>
								}
								<div className={styles['form-field__wrapper']}>
									<Field name='description' id='description'
										label='Description'
										component={ TextField }
										textarea={ true }
										height='120px'
									/>
								</div>
								<div className={ styles['submit-btn__wrapper'] }>
									<PrimaryButton
										width='140px'
										height='40px'
										fontSize='15px'
										text={ isEditForm ? 'Confirm Modify' : 'Create Practice' }
										background={ isEditForm ? '#8944AB' : '#53BA37' }
										onClick={() => submitForm()}
									/>
								</div>
							</div>
						</Form>
					);
				}}
			</Formik>
		</SideModal> );
};

export default AddPracticeModal;
