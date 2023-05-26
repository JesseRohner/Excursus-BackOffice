import React, {useMemo} from 'react';

import { ROUTES } from '../../../routes/constants';
import { DataTableDefault } from '../../Common/DataTables';
import Label from '../../Common/Label';
import styles from './StoresList.module.scss';

export default ({
	storesList,
	tableName,
	tableKey,
	paginationOption = true
}) => {
	const tableColumns = useMemo(() => [
		{
			name: 'is_legal',
			label: 'Head office',
			filter: false,
			sort: true,
			centered: true,
			customBodyRender: data => data ?
				(
					<span className={ styles['table__is-head-column'] }>
						<Label
							background='#1A817B'
							content='HEAD OFFICE'
							width='85px'
							height='21px'
							borderRadius='2px'
							color='#FFFF'
							padding='3px'
							fontSize='11px'
						/>
					</span>) :
				''
		},
		{
			name: 'id',
			label: 'ID Store',
			filter: false,
			sort: true,
			centered: true,
		},
		{
			name: 'name',
			label: 'Store Name',
			filter: false,
			sort: true,
			centered: true,
		},
		{
			name: 'address',
			label: 'Address',
			filter: false,
			sort: true,
		},
		{
			name: 'city',
			label: 'City',
			filter: true,
			sort: true,
			customBodyRender: data => <span className={ styles['table__details-column'] }>
				{data}
			</span>
		},
		{
			name: 'customer',
			label: 'Customer',
			filter: true,
			sort: true,
			customBodyRender: data => <span className={ styles['table__details-column'] }>
				{data}
			</span>
		},
	], []);

	return (
		<div className={ styles.container__inner }>
			<DataTableDefault
				tableData={ storesList?.map( store => {
					const address = `
					${store?.address?.street},
					${store?.address?.building_number || '-'},
					apt. ${store?.address?.apartment || '-'}
					`;

					return ( {
						...store,
						id: store.store_id,
						name: store.name,
						address,
						city: store?.address?.city || '',
						customer: `${store?.customer.first_name} ${store?.customer.last_name}`
					} );
				} ) }
				tableName={tableName}
				tableColumns={ tableColumns }
				uniqueKey={tableKey}
				paginationOption={paginationOption}
				detailsLink={ROUTES.STORES}
			/>
		</div>
	);
};
