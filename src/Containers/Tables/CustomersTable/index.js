import React, {useMemo} from 'react';

import { ROUTES } from '../../../routes/constants';
import {DataTableDefault} from '../../Common/DataTables';
import styles from './CustomersTable.module.scss';


export default ({
	customersList,
	tableName,
	tableKey,
	paginationOption
}) => {
	const tableColumns = useMemo(() => [
		{
			name: 'id',
			label: 'ID Customer',
			filter: false,
			sort: true,
			centered: true,
		},
		{
			name: 'first_name',
			label: 'Name',
			filter: false,
			sort: true,
		},
		{
			name: 'last_name',
			label: 'Surname',
			filter: false,
			sort: true,
		},
		{
			name: 'email',
			label: 'Email',
			filter: true,
			sort: true,
		},
		{
			name: 'store',
			label: 'Store',
			filter: true,
			sort: true,
		},
	], []);
	return (
		<div className={ styles.container__inner }>
			<DataTableDefault
				tableData={ customersList?.map( customer => {
					const store = customer?.stores?.length > 1 ? customer?.stores?.length : customer?.stores?.[0]?.name;

					return ( {
						id: customer.id,
						first_name: customer.first_name,
						last_name: customer.last_name,
						email: customer.email,
						store
					} );
				} ) }
				tableName={tableName}
				tableColumns={ tableColumns }
				uniqueKey={tableKey}
				paginationOption={paginationOption}
				detailsLink={ROUTES.CUSTOMERS}
			/>
		</div>
	);
};
