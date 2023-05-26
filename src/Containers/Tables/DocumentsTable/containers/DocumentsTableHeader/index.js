import { useState } from 'react';

import PlusIcon from '../../../../../assets/svg/plus-circle.svg';
import PrimaryButton from '../../../../Common/Buttons/PrimaryButton';
import AddDocumentModal from '../AddDocumentModal';
import styles from './DocumentsTableHeader.module.scss';

const DocumentsTableHeader = ({isCustomerDocuments, parentId}) => {
	const [ isAddDocumentModalOpen, setIsAddDocumentModalOpen ] = useState( false );

	return ( <div className={ styles.container__header }>
		<h2>Documents and Notes</h2>
		<PrimaryButton
			height='34px'
			fontSize='13px'
			padding='8px 10px'
			text='Add Documents'
			leftIconSrc={ PlusIcon }
			onClick={ () => setIsAddDocumentModalOpen( true ) }
		/>
		<AddDocumentModal
			isCustomerDocuments={ isCustomerDocuments }
			parentId={ parentId }
			isAddDocumentModalOpen={ isAddDocumentModalOpen }
			setIsAddDocumentModalOpen={() => setIsAddDocumentModalOpen(false)}
		/>
	</div> );
};

export default DocumentsTableHeader;
