import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { ROUTES } from '../../../routes/constants';
import {DataTableCustomized} from '../../Common/DataTables';
import Label from '../../Common/Label';
import {statusesActions} from '../../TypesAndStatuses/store';
import {getAllStatuses} from '../../TypesAndStatuses/store/selectors';
import styles from './PracticesList.module.scss';

const PracticesTable = ( {
	practices, tableName, tableKey, paginationOption = true, filterOption= true
} ) => {
	const dispatch = useDispatch();
	const allStatuses = useSelector( getAllStatuses() );

	useEffect( () => {
		dispatch( statusesActions.GET_ALL_STATUSES.REQUEST() );
	}, [ dispatch ] );

	const tableColumns = useMemo( () => [
		{
			name: 'id',
			label: 'ID Practice',
			sort: true,
			centered: true,
			customBodyRender: data => (
				<span className={ styles['table__id-column'] }>{ data }</span>
			)
		},
		{
			name: 'created_at',
			label: 'Date',
			sort: true,
			filter: true
		},
		{
			name: 'title',
			label: 'Title',
			sort: true,
		},
		{
			name: 'customer',
			label: 'Customer',
			filter: false,
			sort: true,
			centered: true,
			customBodyRender: data => (
				<span className={ styles['table__details-column'] }>{ data }</span>
			)
		},
		{
			name: 'detective',
			label: 'Detective',
			filter: false,
			sort: true,
			centered: true,
			customBodyRender: data => (
				<span className={ styles['table__details-column'] }>{ data || '-'}</span>
			)
		},
		{
			name: 'store',
			label: 'Store',
			sort: true,
			filter: false,
			centered: true,
			customBodyRender: data => (
				<span className={ styles['table__details-column'] }>{ data || '-' }</span>
			)
		},
		{
			name: 'status',
			label: 'Status',
			sort: true,
			filter: true,
			centered: true,
			customBodyRender: data => {
				const status = allStatuses?.find( statusType => statusType?.name === data ) || '';

				return (
					<span className={ styles['table__status-column'] }>
						<Label
							content={ data }
							background={ status?.color }
							color='#FFFF'
							padding='5px'
							width='100px'
							height='26px'
						/>
					</span>
				);
			}
		},
	], [ allStatuses ] );

	return (
		<DataTableCustomized
			tableData={ practices?.map( practice => {
				const date = new Date( practice.created_at ).toLocaleDateString( 'it-IT', {
					'day': '2-digit',
					'month': '2-digit',
					'year': 'numeric'
				} );
				const detective = practice?.detectives?.length ?
					practice?.detectives?.length > 1 ?
						practice?.detectives?.length :
						`${practice?.detectives?.[0].first_name} ${practice?.detectives?.[0].last_name}` :
					0;
				const store = practice?.stores?.length ?
					practice?.stores?.length > 1 ?
						practice?.stores?.length :
						`${practice?.stores?.[0].store_name}` :
					0;

				return ( {
					id: practice.id,
					created_at: date,
					title: practice?.title,
					customer: `${practice?.customer?.first_name} ${practice?.customer?.last_name}`,
					detective,
					store,
					status: practice?.status?.name
				} );
			} ) }
			tableName={ tableName }
			tableColumns={ tableColumns }
			uniqueKey={ tableKey }
			paginationOption={ paginationOption }
			filterOption={filterOption}
			detailsLink={ ROUTES.PRACTICES }
		/>
	);
};

export default PracticesTable;
