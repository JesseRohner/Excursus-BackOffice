import React, {useMemo} from 'react';

import { ROUTES } from '../../../routes/constants';
import {DataTableDefault} from '../../Common/DataTables';
import Label from '../../Common/Label';
import styles from './ChiefsList.module.scss';

export default ({
	chiefsList,
	tableName,
	tableKey,
	paginationOption
}) => {
	const tableColumns = useMemo(() => [
		{
			name: 'is_buyer',
			label: 'Buyer',
			filter: false,
			sort: true,
			centered: true,
			customBodyRender: data => data ?
				(
					<span className={ styles['table__is-buyer-column'] }>
						<Label
							background='#F5E23D'
							content='BUYER'
							width='55px'
							height='21px'
							borderRadius='2px'
							color='#2E3338'
							padding='3px'
							fontSize='11px'
						/>
					</span>) :
				''
		},
		{
			name: 'id',
			label: 'ID ZCM',
			filter: false,
			sort: true,
			centered: true,
		},
		{
			name: 'first_name',
			label: 'Name',
			filter: false,
			sort: true,
			customBodyRender: data => <span className={ styles['table__details-column'] }>
				{data}
			</span>
		},
		{
			name: 'last_name',
			label: 'Surname',
			filter: false,
			sort: true,
			customBodyRender: data => <span className={ styles['table__details-column'] }>
				{data}
			</span>
		},
		{
			name: 'stores',
			label: 'N° Store',
			filter: true,
			sort: true,
			centered: true,
		},
		{
			name: 'email',
			label: 'Email',
			filter: false,
			sort: true,
		},
	], []);

	return (
		<div className={ styles.container__inner }>
			<DataTableDefault
				tableData={ chiefsList?.map( chief => ( {
					is_buyer: chief?.is_buyer,
					id: chief.id,
					first_name: chief.first_name,
					last_name: chief.last_name,
					email: chief.email,
					stores: chief?.stores?.length
				} ) ) }
				tableName={tableName}
				tableColumns={ tableColumns }
				paginationOption={paginationOption}
				uniqueKey={tableKey}
				detailsLink={ROUTES.CHIEF_MANAGERS}
			/>
		</div>
	);
};
