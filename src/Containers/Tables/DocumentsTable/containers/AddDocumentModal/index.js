import clx from 'classnames';
import {
	Field, Form, Formik
} from 'formik';
import React, {
	useEffect, useRef, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import CloseIcon from '../../../../../assets/svg/close.svg';
import EyeIcon from '../../../../../assets/svg/eye.svg';
import LabeledButton from '../../../../Common/Buttons/LabeledButton';
import PrimaryButton from '../../../../Common/Buttons/PrimaryButton';
import FilePreviewBlock from '../../../../Common/FilePreviewBlock';
import SideModal from '../../../../Common/SideModal';
import TextField from '../../../../Common/TextField';
import { customerActions } from '../../../../Customers/store';
import { practiceActions } from '../../../../Practices/store';
import {statusesActions} from '../../../../TypesAndStatuses/store';
import {getDocumentTypes} from '../../../../TypesAndStatuses/store/selectors';
import styles from './AddDocumentModal.module.scss';
import FormSideContent from './containers/FormSideContent';
import LockButton from './containers/LockButton';

const AddDocumentModal = ( {
	isEditForm = false,
	title = 'New Document/Note',
	editFormInitialValues = false,
	isCustomerDocuments = false,
	parentId,
	isAddDocumentModalOpen,
	setIsAddDocumentModalOpen,
	files=false,
} ) => {
	const dispatch = useDispatch();
	const documentModalRef = useRef();
	const [ activeList, setActiveList ] = useState( false );
	const [ filesInfo, setFilesInfo ] = useState( [] );
	const [ deletedFilesInfo, setDeletedFilesInfo ] = useState( [] );
	const [ modifiedFilesInfo, setModifiedFilesInfo ] = useState( [] );
	const [ isFileFullSize, setIsFileFullSize ] = useState( false );
	const documentTypes = useSelector( getDocumentTypes() );

	useEffect( () => {
		if ( deletedFilesInfo.length && files?.length) {
			setModifiedFilesInfo( files?.filter( file => !deletedFilesInfo.includes( +file?.id)) );
		} else {
			setModifiedFilesInfo(files);
		}
	}, [ deletedFilesInfo, files ] );

	useEffect(() => {
		dispatch( statusesActions.GET_DOCUMENT_TYPES.REQUEST() );
	}, [dispatch]);

	const FORM_LISTS = {
		DOCUMENT_TYPES: 'DOCUMENT_TYPES',
		FILES: 'FILES'
	};

	const INITIAL_VALUES = {
		description: editFormInitialValues ? editFormInitialValues.description : '',
		type_id: editFormInitialValues ? editFormInitialValues.type_id : '',
		document_permission_for_customer: editFormInitialValues ? editFormInitialValues.document_permission_for_customer : false,
		document_permission_for_detectives: editFormInitialValues ? editFormInitialValues.document_permission_for_detectives : false,
	};

	const VALIDATION_SCHEMA = yup.object().shape({
		description: yup
			.string( 'Enter description' )
			.required( 'Description is required' ),
		type_id: yup
			.string( 'Choose a document type' )
			.required( 'Type is required' ),
	});

	return (
		<SideModal isModalOpen={ isAddDocumentModalOpen } setIsModalOpen={ setIsAddDocumentModalOpen }
			width={isFileFullSize && '100%'}
		>
			<Formik
				enableReinitialize
				initialValues={ INITIAL_VALUES }
				validationSchema={ VALIDATION_SCHEMA }
				innerRef={ documentModalRef }
				onSubmit={ values => {
					if ( +values?.type_id === 3 ) {
						console.log('videos', filesInfo?.map(file => file?.url));
					} else if ( isEditForm ) {
						let updatedValues = Object.keys( INITIAL_VALUES )?.reduce( ( updatedObj, initialValue ) => {
							if ( INITIAL_VALUES[initialValue] !== values[initialValue] ) {
								updatedObj = { ...updatedObj, [initialValue]: values[initialValue] };
							}
							return updatedObj;
						}, {} );

						if ( filesInfo?.length ) {
							updatedValues = {...updatedValues, imagesInBase64: filesInfo?.map(file => file?.url)};
						}
						if ( deletedFilesInfo?.length ) {
							updatedValues = {...updatedValues, image_ids_to_delete: deletedFilesInfo};
						}

						if ( isCustomerDocuments ) {
							dispatch( customerActions.EDIT_CUSTOMER_DOCUMENT.REQUEST(
								{ document_id: editFormInitialValues?.document_id, ...updatedValues }, setIsAddDocumentModalOpen) );
						} else {
							dispatch( practiceActions.EDIT_PRACTICE_DOCUMENT.REQUEST(
								{ document_id: editFormInitialValues?.document_id, ...updatedValues }, setIsAddDocumentModalOpen) );
						}
					} else if ( isCustomerDocuments ) {
						dispatch( customerActions.CREATE_CUSTOMER_DOCUMENT.REQUEST(
							{
								customer_id: parentId,
								...values,
								imagesInBase64: filesInfo?.map( file => file?.url )
							}, setIsAddDocumentModalOpen ) );
					} else {
						dispatch( practiceActions.CREATE_PRACTICE_DOCUMENT.REQUEST(
							{
								practice_id: parentId,
								...values,
								imagesInBase64: filesInfo?.map(file => file?.url)
							}, setIsAddDocumentModalOpen));
					}
				} }
			>
				{ ( {
					errors, touched, values, submitForm, setFieldValue, isValid, setFieldTouched
				} ) => {
					const documentType = documentTypes?.find( type => +type?.id === +values?.type_id );

					return (
						<Form className={ styles['add-document__form'] }>
							{
								isFileFullSize && <FilePreviewBlock
									isFileFullSize={ isFileFullSize }
									setIsFileFullSize={ setIsFileFullSize }
								/>
							}
							{ activeList && <FormSideContent
								documentTypes={ documentTypes }
								formValues={ values }
								errors={ errors }
								activeList={ activeList }
								setActiveList={ setActiveList }
								setFieldValue={ setFieldValue }
								setFilesInfo={ setFilesInfo }
								filesInfo={ filesInfo }
								isFileFullSize={ isFileFullSize }
								setIsFileFullSize={ setIsFileFullSize }
								modifiedFilesInfo={ modifiedFilesInfo || [] }
								setDeletedFilesInfo={setDeletedFilesInfo}
							/> }
							<div className={ styles['main-form'] }>
								<div className={ styles.modal__header } onClick={ () => {
									setActiveList(false);
									setIsAddDocumentModalOpen();
								}}>
									<img src={ CloseIcon } alt='close' />
								</div>
								<h2 className={ styles.modal__title }>{ title }</h2>
								<div className={ styles['form-field__wrapper'] }>
									<LabeledButton
										text={ documentType ?
											(
												<div className={ styles['value__label'] }>
													<div className={ styles['value__info'] }>
														<span className={ styles['value__fullname'] }>
															{ documentType?.name }
														</span>
														<span className={ styles['value__id'] }>ID-{ documentType?.id }</span>
													</div>
													<span className={ 'checked__btn' } onClick={ e => {
														e.preventDefault();
														e.stopPropagation();
														setFieldValue( 'type_id', '' );
													}
													} />
												</div>
											) :
											'Select Type' }
										onClick={ () => {
											if ( activeList === FORM_LISTS.DOCUMENT_TYPES ) {
												setActiveList( false );
											} else {
												setActiveList( FORM_LISTS.DOCUMENT_TYPES );
											}
										} }
										isActive={ activeList === FORM_LISTS.DOCUMENT_TYPES }
										label='Type'
										isError={ touched?.type_id && errors.type_id }
										height={ documentType && 'auto' }
									/>
								</div>
								<div className={ styles['form-field__wrapper'] }>
									<LabeledButton text='Manage Files'
										onClick={ () => {
											if ( activeList === FORM_LISTS.FILES ) {
												setActiveList( false );
											} else {
												setActiveList( FORM_LISTS.FILES );
											}
										} }
										isActive={ activeList === FORM_LISTS.FILES }
										label='File'
										isError={ !isEditForm ?
											( touched?.description && touched?.type_id ) &&
												!filesInfo?.length && 'File is required' :
											!modifiedFilesInfo?.length && !filesInfo?.length
										}
									/>

									{ modifiedFilesInfo?.length ?
										<div className={ styles['selected-values'] }>
											{ modifiedFilesInfo.map( image => (
												<div key={ image?.name } className={ clx( styles['value__details'] ) }>
													<span>{ image?.name }</span>
													<img src={ EyeIcon } alt='full screen'
														onClick={ () => setIsFileFullSize( image?.url ) } />
												</div>
											) ) }
										</div> :
										null }
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
								<div className={ styles['form-field__wrapper'] }>
									<Field name='description' id='description'
										label='Description'
										component={ TextField }
										textarea={ true }
										height='120px'
										placeholder='Write here a description...'
									/>
								</div>
								<div className={ styles['form-field__wrapper'] }>
									<Field name='document_permission_for_detectives'
										id='document_permission_for_detectives'
										label='Detective'
										component={ LockButton }
										height='120px'
									/>
								</div>
								<div className={ styles['form-field__wrapper'] }>
									<Field name='document_permission_for_customer'
										id='document_permission_for_customer'
										label='Customer'
										component={ LockButton }
										height='120px'
									/>
								</div>
								<div className={ styles['submit-btn__wrapper'] }>
									<PrimaryButton
										width='auto'
										height='40px'
										fontSize='15px'
										text={ isEditForm ? 'Confirm Modify' : 'Create Document/Note' }
										background={ isEditForm ? '#8944AB' : '#53BA37' }
										onClick={ () => submitForm() }
									/>
								</div>
							</div>
						</Form>
					);
				}}
			</Formik>
		</SideModal>
	);
};

export default AddDocumentModal;
