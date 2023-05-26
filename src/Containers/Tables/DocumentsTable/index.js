import {
	useEffect, useMemo, useState
} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	Link, useLocation,
	useSearchParams
} from 'react-router-dom';

import FileIcon from '../../../assets/images/file.png';
import EyeIcon from '../../../assets/svg/eye.svg';
import LockIcon from '../../../assets/svg/lock.svg';
import { ROUTES } from '../../../routes/constants';
import {DataTableDefault} from '../../Common/DataTables';
import {statusesActions} from '../../TypesAndStatuses/store';
import {getDocumentTypes} from '../../TypesAndStatuses/store/selectors';
import AddDocumentModal from './containers/AddDocumentModal';
import DocumentsTableHeader from './containers/DocumentsTableHeader';
import styles from './DocumentsList.module.scss';

export default ({
	documents,
	tableKey,
	paginationOption = true,
	filterOption = true,
	isCustomerDocuments = false,
	parentId,
	isDashboard
}) => {
	const dispatch = useDispatch();
	const documentTypes = useSelector( getDocumentTypes() );
	const [ isModifyDocumentModalOpen, setIsModifyDocumentModalOpen ] = useState( false );
	const [ activeDocument, setActiveDocument ] = useState( false );
	const { pathname } = useLocation();
	const [ searchParams, setSearchParams ] = useSearchParams();

	useEffect( () => {
		if ( searchParams.get( 'document' ) ) {
			setActiveDocument( documents?.find( doc => +doc?.id === +searchParams.get( 'document' ) ) );
			setIsModifyDocumentModalOpen( true );
		} else {
			setActiveDocument(false);
		}
	}, [ searchParams, documents ] );

	useEffect(() => {
		dispatch( statusesActions.GET_DOCUMENT_TYPES.REQUEST() );
	}, [dispatch]);

	const tableColumns = useMemo(() => [
		{
			name: 'privacy',
			label: 'Privacy',
			sort: false,
			customBodyRender: data => (
				<span className={styles['table__privacy-column']}>
					{ data.customer &&
					<span className={styles['privacy-row']}>
						<img src={ LockIcon } alt='lock' />
						<b>CUSTOMER</b>
					</span> }
					{ data.detective && <span className={styles['privacy-row']}>
						<img src={ LockIcon } alt='lock' />
						<b>DETECTIVE</b>
					</span> }
				</span>
			)
		},
		{
			name: 'id',
			label: 'ID',
			filter: false,
			sort: true,
			customBodyRender: data => (
				<span className={styles['table__id-column']}>
					<span className={styles['id-column__label']}>PRACTICE</span>
					<span className={styles['id-column__value']}>{ data }</span>
				</span>
			)
		},
		{
			name: 'type',
			label: 'Document Type',
			sort: true,
			customBodyRender: data => (
				<span className={styles['table__type-column']}>{ data }</span>
			)
		},
		{
			name: 'creator',
			label: 'Posted by',
			sort: true,
			customBodyRender: data => (
				<span className={ styles['table__creator-column'] }>
					{data}
				</span>
			)
		},
		{
			name: 'created_at',
			label: 'Date',
			sort: true,
		},
		{
			name: 'description',
			label: 'Description',
			sort: true,
		},
		{
			name: 'pictures',
			label: 'Attached Document',
			sort: false,
			filter: false,
			customBodyRender: data => {
				const count = data?.pictures?.length > 1 ? data?.pictures?.length - 1 : 0;

				return (
					<span className={ styles['table__pictures-column'] }>
						{ data?.pictures?.length && <>

							<img onError={ ({currentTarget}) => currentTarget.src=FileIcon }
								src={ data?.pictures[0].url } alt='document' className={ styles['attached-doc'] } />
							{ count ?
								<Link to={ {
									pathname,
									search: `?document=${data?.id}`
								} }
								className={ styles['attached-all'] }>
									<b>+{ count }</b>
									<b>See all</b>
								</Link> :
								null }
						</>
						}
					</span>
				);
			}
		},
	], [] );

	return (
		<div className={ styles.table__wrapper }>
			{ !isDashboard && <DocumentsTableHeader isCustomerDocuments={ isCustomerDocuments } parentId={ parentId } /> }
			<DataTableDefault
				tableData={ documents?.map( document => {
					const docType = documentTypes?.find( type => +type.id === +document.type_id )?.name || '';
					const privacy = {
						customer: !!document.document_permission_for_customer,
						detective: !!document.document_permission_for_detectives
					};
					const date = new Date( document.created_at ).toLocaleDateString( 'it-IT', {
						'day': '2-digit',
						'month': '2-digit',
						'year': 'numeric'
					} );
					const documentItem = {
						privacy,
						id: document.id,
						type: docType,
						creator: `${document?.creator?.first_name} ${document?.creator?.last_name}`,
						created_at: date,
						description: document.description,
						pictures: {
							id: document.id,
							pictures: document?.pictures
						},
					};
					if ( isDashboard ) {
						return ( {
							...documentItem,
							options: <Link to={ `${ROUTES.PRACTICES}/${document?.practice_id}`}>
								<img className='eye-icon' src={ EyeIcon } alt="details" />
							</Link>
						});
					} else {
						return documentItem;
					}
				} ) }
				tableColumns={ tableColumns }
				uniqueKey={tableKey}
				filterOption={ filterOption }
				paginationOption={ paginationOption }
				isDocumentsTable={!isDashboard || true}
			/>
			<AddDocumentModal
				title='Modify Document'
				isEditForm={ true }
				isCustomerDocuments={ isCustomerDocuments }
				parentId={ parentId }
				isAddDocumentModalOpen={ isModifyDocumentModalOpen }
				setIsAddDocumentModalOpen={ () => {
					setSearchParams(false);
					window.history.pushState( null, null, pathname );
					setIsModifyDocumentModalOpen( false );
				} }
				editFormInitialValues={ {
					document_id: +searchParams.get( 'document' ),
					description: activeDocument?.description,
					type_id: activeDocument?.type_id,
					document_permission_for_customer: !!activeDocument?.document_permission_for_customer,
					document_permission_for_detectives: !!activeDocument?.document_permission_for_detectives,
				} }
				files={ activeDocument?.pictures?.map( picture => {
					const name = picture?.url.substring(picture?.url.lastIndexOf('/')+1).split( '.' )[0];

					return {
						id: picture?.picture_id,
						name,
						url: picture?.url
					};
				})}
			/>
		</div>
	);
};
