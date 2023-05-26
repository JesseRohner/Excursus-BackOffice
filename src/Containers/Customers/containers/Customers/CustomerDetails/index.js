import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
	useLocation,
	useParams
} from 'react-router-dom';

import {TABLE_KEYS} from '../../../../Common/DataTables/constants';
import ChiefsTable from '../../../../Tables/ChiefsTable';
import DocumentsTable from '../../../../Tables/DocumentsTable';
import PracticesTable from '../../../../Tables/PracticesTable';
import StoresTable from '../../../../Tables/StoresTable';
import { customerActions } from '../../../store';
import { getCustomer } from '../../../store/selectors';
import AddChiefModal from './containers/AddChiefModal';
import AddStoreModal from './containers/AddStoreModal';
import CustomerInfo from './containers/CustomerInfo';
import DeleteCustomerModal from './containers/DeleteCustomerModal';
import styles from './CustomerDetails.module.scss';

export default () => {
	const dispatch = useDispatch();
	const { customerId } = useParams();
	const customer = useSelector(getCustomer());
	const { pathname } = useLocation();

	useEffect(() => {
		dispatch( customerActions.GET_CUSTOMER.REQUEST(customerId) );
	}, [customerId, dispatch]);

	return (
		Object.values(customer).length ?
			<div className={ styles.container__inner }>
				<CustomerInfo customer={ customer?.customer } />
				<DocumentsTable
					documents={ customer?.documents }
					tableKey={ `${pathname}/${TABLE_KEYS.DOCUMENT}` }
					parentId={ customer?.customer?.id }
					isCustomerDocuments={true}
				/>
				<AddChiefModal
					customerId={customer.customer.id}
					stores={customer.stores}
				/>
				<ChiefsTable
					chiefsList={ customer?.chiefs }
					tableKey={`${pathname}/${TABLE_KEYS.CHIEF}`}
				/>
				<AddStoreModal
					customerId={customer?.customer?.id}
					customerChiefs={customer.chiefs}
				/>
				<StoresTable
					storesList={ customer?.stores }
					tableKey={`${pathname}/${TABLE_KEYS.STORE}`}
				/>
				<div className={ styles.container__header }>
					<h2>Practices</h2>
				</div>
				<PracticesTable
					practices={customer.practices}
					tableKey={`${pathname}/${TABLE_KEYS.PRACTICE}`}
				/>
				<div className={styles.container__action}>
					<DeleteCustomerModal
						customerId={customerId}
					/>
				</div>
			</div> :
			null
	);
};
