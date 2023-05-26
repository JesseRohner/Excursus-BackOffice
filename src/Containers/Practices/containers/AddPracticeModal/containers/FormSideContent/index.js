import {
	Field, FieldArray,
} from 'formik';
import React, {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as ArrowIcon } from '../../../../../../assets/svg/arrow-small.svg';
import useOutsideClick from '../../../../../../utils/useOutsideClick';
import LabeledButton from '../../../../../Common/Buttons/LabeledButton';
import RadioButton from '../../../../../Common/Buttons/RadioButton';
import CheckboxField from '../../../../../Common/CheckboxField';
import PreviewsList from '../../../../../Common/PreviewsList';
import TextField from '../../../../../Common/TextField';
import UploadFileModal from '../../../../../Common/UploadFileModal';
import { practiceActions } from '../../../../store';
import styles from '../../AddPracticeModal.module.scss';
import { FORM_LISTS } from '../../constants';

const FormSideContent = ( {
	infoForPracticeCreation,
	formValues,
	errors,
	touched,
	setFieldTouched,
	activeList,
	setActiveList,
	setFieldValue,
	filesInfo,
	setFilesInfo,
	isFileFullSize,
	setIsFileFullSize,
	customerStores,
	chiefs
} ) => {
	const dispatch = useDispatch();
	const dropdownListRef = useRef();

	const [ isDocumentTypesListOpen, setIsDocumentTypesListOpen ] = useState( false );

	useOutsideClick( dropdownListRef, () => {
		if ( isDocumentTypesListOpen ) setIsDocumentTypesListOpen( false );
	} );
	return (
		<div className={ styles['list__wrapper'] }>
			<ArrowIcon
				onClick={ () => setActiveList( false ) }
				className={ styles.arrow__btn }
			/>
			{ activeList === FORM_LISTS.PRACTICE_TYPES && <FieldArray
				name="type_ids"
				render={ arrayHelpers => (
					<div className={ styles['list'] }>
						<h2>Type of practice</h2>
						{ infoForPracticeCreation?.practiceTypes?.map( type => (
							<CheckboxField
								key={ type.id }
								label={ type.name }
								onChange={ e => {
									if ( e.target.checked ) {
										setFieldValue('type_ids', []);
										arrayHelpers.push( type.id );
									} else {
										const idx = formValues.type_ids.indexOf( type.id );
										arrayHelpers.remove( idx );
									}
									setFieldTouched('type_ids', true);
								} }
								value={ type.id }
								checked={ formValues.type_ids.includes( type.id ) }
							/>
						) ) }
					</div>
				) }
			/> }
			{ activeList === FORM_LISTS.CUSTOMERS && <div className={ styles['list'] }>
				<h2>List of Customers</h2>
				{ infoForPracticeCreation?.customers?.map( customer => (
					<Field
						key={ customer.id }
						name='customer_id'
						id={ customer.id }
						label={ `${customer.first_name} ${customer.last_name}` }
						component={ RadioButton }
						onClick={ e => {
							if ( e.target.checked && +formValues.customer_id === +e.target.value ) {
								setFieldValue( 'customer_id', '' );
							} else {
								setFieldValue( 'customer_id', e.target.value );
								dispatch( practiceActions.GET_CUSTOMER_STORES.REQUEST( e.target.value ) );
							}
						} }
					/>
				) ) }
			</div>
			}
			{ activeList === FORM_LISTS.STORES && customerStores?.length ?
				<FieldArray
					name="store_ids"
					render={ arrayHelpers => (
						<div className={ styles['list'] }>
							<h2>List of Stores</h2>
							{ customerStores?.map( store => (
								<CheckboxField
									key={ store.store_id }
									label={ store.name }
									onChange={ e => {
										if ( e.target.checked ) {
											arrayHelpers.push( store.store_id );
										} else {
											const idx = formValues.store_ids.indexOf( store.store_id );
											arrayHelpers.remove( idx );
										}
										setFieldTouched('store_ids', true);
									} }
									value={ store.store_id }
									checked={ formValues.store_ids.includes( store.store_id ) }
								/>
							) ) }
						</div>
					) }
				/> :
				null
			}
			{ activeList === FORM_LISTS.DETECTIVES && <FieldArray
				name="detective_ids"
				render={ arrayHelpers => (
					<div className={ styles['list'] }>
						<h2>List of Detectives</h2>
						{ infoForPracticeCreation?.detectives?.map( detective => (
							<CheckboxField
								key={ detective.id }
								label={ `${detective.first_name} ${detective.last_name}` }
								onChange={ e => {
									if ( e.target.checked ) {
										arrayHelpers.push( detective.id );
									} else {
										const idx = formValues.detective_ids.indexOf( detective.id );
										arrayHelpers.remove( idx );
									}
									setFieldTouched('detective_ids', true);
								} }
								value={ detective.id }
								checked={ formValues.detective_ids.includes( detective.id ) }
							/>
						) ) }
					</div>
				) }
			/>
			}
			{ activeList === FORM_LISTS.CHIEF && <FieldArray
				name="chief_ids"
				render={ arrayHelpers => (
					<div className={ styles['list'] }>
						<h2>List of Chiefs</h2>
						{ chiefs?.map( chief => (
							<CheckboxField
								key={ chief.id }
								label={ `${chief.first_name} ${chief.last_name}` }
								onChange={ e => {
									if ( e.target.checked ) {
										arrayHelpers.push( chief.id );
									} else {
										const idx = formValues.chief_ids.indexOf( chief.id );
										arrayHelpers.remove( idx );
									}
									setFieldTouched('chief_ids', true);
								} }
								value={ chief.id }
								checked={ formValues.chief_ids.includes( chief.id ) }
							/>
						) ) }
					</div>
				) }
			/>
			}
			{ activeList === FORM_LISTS.DOCUMENTS && <div className={ styles['list'] }>
				<h2>Add Document</h2>
				<div className={ styles['dropdown-list__wrapper'] }>
					<LabeledButton
						boxShadow='0px 10px 21px -12px rgba(46, 51, 56, 0.31)'
						text={ formValues?.document?.type_id ?
							(
								<div className={ styles['value__label'] }>
									<div className={ styles['value__info'] }>
										<span className={ styles['value__fullname'] }>
											{ infoForPracticeCreation?.documentTypes?.find( docType =>
												+docType.id === +formValues?.document?.type_id ).name }
										</span>
									</div>
									<span className={ 'checked__btn' } onClick={ e => {
										e.preventDefault();
										setFieldValue( 'document.type_id', '' );
									}
									} />
								</div>
							) :
							<span className={ styles.dropdown__label }>
								<span>Select Type of Document</span>
								<ArrowIcon />
							</span>
						}
						onClick={ () => setIsDocumentTypesListOpen( s => !s ) }
						isActive={ isDocumentTypesListOpen }
						label='Type'
						isError={ touched?.document?.type_id && errors?.document?.type_id }
					/>
					{ isDocumentTypesListOpen && <div className={ styles['dropdown-list'] } ref={ dropdownListRef }>
						{ infoForPracticeCreation?.documentTypes?.map( docType => (
							<Field
								key={ docType.id }
								name='document.type_id'
								id={ docType.id }
								label={ docType.name }
								component={ RadioButton }
								onChange={() => setFilesInfo( [] )}
								onClick={ e => {
									if ( e.target.checked && +formValues?.document?.type_id === +e.target.value ) {
										setFieldValue( 'document.type_id', '' );
									} else {
										setFieldValue( 'document.type_id', e.target.value );
									}
								} }
							/>
						) ) }
					</div> }
				</div>
				<UploadFileModal
					setUploadFiles={ setFilesInfo }
					acceptedFileTypes={+formValues?.document?.type_id === 3 && 'video/*'}
				/>
				{ filesInfo?.length ?
					<PreviewsList
						filesInfo={ filesInfo }
						setFilesInfo={ setFilesInfo }
						setIsFileFullSize={ setIsFileFullSize }
						isFileFullSize={ isFileFullSize }
					/> :
					null }
				<Field name='document.description' id='document.description'
					label='Description'
					component={ TextField }
					textarea={ true }
					height='120px'
					border='1px solid #DCDFE3'
				/>
			</div>
			}
		</div>
	);
};

export default FormSideContent;
