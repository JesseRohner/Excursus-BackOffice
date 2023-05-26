import React, {useMemo} from 'react';

import { ROUTES } from '../../../routes/constants';
import {DataTableDefault} from '../../Common/DataTables';
import Label from '../../Common/Label';
import styles from './DetectivesTable.module.scss';


export default ({
	detectivesList,
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
			name: 'is_active',
			label: 'Status',
			filter: false,
			sort: true,
			centered: true,
			customBodyRender: data => data ?
				(
					<span className={ styles['table__is-buyer-column'] }>
						<Label
							background='#248A3D'
							content='Active'
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
	], []);
	return (
		<div className={ styles.container__inner }>
			<DataTableDefault
				tableData={ detectivesList?.map( detective => {
					const store = detective?.stores?.length > 1 ? detective?.stores?.length : detective?.stores?.[0]?.name;

					return ( {
						id: detective.id,
						first_name: detective.first_name,
						last_name: detective.last_name,
						email: detective.email,
						is_active: detective.is_active,
						store
					} );
				} ) }
				tableName={tableName}
				tableColumns={ tableColumns }
				uniqueKey={tableKey}
				paginationOption={paginationOption}
				detailsLink={ROUTES.DETECTIVES}
			/>
		</div>
	);
};
