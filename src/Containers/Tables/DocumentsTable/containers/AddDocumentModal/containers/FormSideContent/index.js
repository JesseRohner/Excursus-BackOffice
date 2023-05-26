import {	Field } from 'formik';

import { ReactComponent as ArrowIcon } from '../../../../../../../assets/svg/arrow-small.svg';
import RadioButton from '../../../../../../Common/Buttons/RadioButton';
import PreviewsList from '../../../../../../Common/PreviewsList';
import UploadFileModal from '../../../../../../Common/UploadFileModal';
import styles from '../../AddDocumentModal.module.scss';

const FormSideContent = ( {
	documentTypes,
	formValues,
	errors,
	activeList,
	setActiveList,
	setFieldValue,
	filesInfo,
	setFilesInfo,
	isFileFullSize,
	setIsFileFullSize,
	modifiedFilesInfo,
	setDeletedFilesInfo,
} ) => (
	<div className={ styles['list__wrapper'] }>
		<ArrowIcon
			onClick={ () => setActiveList( false ) }
			className={ styles.arrow__btn }
		/>
		{ activeList === 'DOCUMENT_TYPES' && <div className={ styles['list'] }>
			<h2>Type of Document</h2>
			{ documentTypes?.map( docType => (
				<Field
					key={ docType.id }
					name='type_id'
					id={ docType.id }
					label={ docType.name }
					component={ RadioButton }
					onClick={ e => {
						if ( e.target.checked && +formValues?.type_id === +e.target.value ) {
							setFieldValue( 'type_id', '' );
						} else {
							setFieldValue( 'type_id', e.target.value );
						}
					} }
				/>
			) ) }
		</div>
		}
		{ activeList === 'FILES' && <div className={ styles['list'] }>
			<h2>Manage Files</h2>
			<UploadFileModal
				setUploadFiles={ setFilesInfo }
				acceptedFileTypes={+formValues?.type_id === 3 && 'video/*'}
			/>
			{ filesInfo?.length ?
				<PreviewsList
					filesInfo={ filesInfo }
					setFilesInfo={ setFilesInfo }
					setIsFileFullSize={ setIsFileFullSize }
					isFileFullSize={ isFileFullSize }
				/> :
				null }
			{ modifiedFilesInfo?.length ?
				<PreviewsList
					filesInfo={ modifiedFilesInfo }
					setFilesInfo={ setDeletedFilesInfo }
					setIsFileFullSize={ setIsFileFullSize }
					isFileFullSize={ isFileFullSize }
					isEditForm={true}
				/> :
				null }
		</div>
		}
	</div>
);

export default FormSideContent;
