import MUIDataTable from 'mui-datatables';
import {
	useEffect, useState
} from 'react';
import { Link, useLocation } from 'react-router-dom';

import EyeIcon from '../../../../../assets/svg/eye.svg';
import { appendFilterListToColumns } from '../../../../../helpers';
import useWindowSize from '../../../../../utils/useWindowSize';
import DataTableFooter from '../DataTableFooter';
import OptionsTableHeadCell from '../OptionsTableHeadCell';

const DataTableCustomized = ( {
	tableData,
	tableColumns,
	rowsPerPageNum = 10,
	detailsLink = false,
	uniqueKey,
	filterOption = true,
	selectableRowsOption = false,
	paginationOption = true,
} ) => {
	const { isMobile } = useWindowSize();
	const [ isFiltersOpen, setIsFilterOpen ] = useState( false );
	const { pathname } = useLocation();
	const [ filterList, setFilterList ] = useState( JSON.parse( localStorage.getItem( `filterList${uniqueKey}` ) ) );
	const [ sortingOptions, setSortingOptions ] = useState( JSON.parse( localStorage.getItem( `sortingOptions${uniqueKey}` ) ) );
	const [ isReset, setReset ] = useState( false );

	const columns = [ ...tableColumns?.map( column => (
		{
			name: column?.name,
			label: column?.label,
			options: {
				filter: column?.filter,
				sort: column?.sort,
				setCellHeaderProps: () => column?.centered && !isMobile && ( { className: 'centeredHeader boldHeader' } ),
				setCellProps: () => column?.centered && !isMobile && ( { className: 'centeredColumn' } ),
				customBodyRender: data => column?.customBodyRender ? column?.customBodyRender( data ) : data,
			}
		}
	) ),
	{
		name: 'options',
		label: '',
		options: {
			filter: false,
			sort: false,
			setCellHeaderProps: () => ( { className: 'centeredHeader' } ),
			setCellProps: () => ( { className: 'centeredColumn' } ),
			customHeadRender: () => <OptionsTableHeadCell
				key={ tableColumns?.length }
				filterOption={ filterOption }
				setIsFilterOpen={ setIsFilterOpen }
				resetOptions={ () => setReset(true) }
			/>
		}
	} ];

	useEffect( () => {
		if ( JSON.parse( localStorage.getItem( `searchText${uniqueKey}` ) ) ) {
			setIsFilterOpen( true );
		}

		if ( uniqueKey ) {
			setFilterList( JSON.parse( localStorage.getItem( `filterList${uniqueKey}` ) ) );
			setSortingOptions( JSON.parse( localStorage.getItem( `sortingOptions${uniqueKey}` ) ) );
		}
	}, [ uniqueKey ] );

	const options = {
		filterType: 'checkbox',
		filter: filterOption,
		sort: true,
		sortOrder: sortingOptions || {},
		searchOpen: true,
		responsive: 'vertical',
		selectableRows: selectableRowsOption && 'multiple',
		tableBodyMaxHeight: 'auto',
		rowsPerPage: rowsPerPageNum,
		rowsPerPageOptions: [],
		searchText: JSON.parse( localStorage.getItem( `searchText${uniqueKey}` ) ) ?
			JSON.parse( localStorage.getItem( `searchText${uniqueKey}` ) ) :
			'',
		pagination: paginationOption,
		onTableChange: ( action, tableState ) => {
			if ( action === 'propsUpdate' ) {
				if ( isReset ) {
					setFilterList( false );
					setSortingOptions( false );
					localStorage.removeItem( `searchText${uniqueKey}` );
					localStorage.removeItem( `filterList${uniqueKey}` );
					localStorage.removeItem( `sortingOptions${uniqueKey}` );
					tableState.filterList = tableState.filterList.map( list => [] );
					tableState.sortOrder = {};
					setReset(false);
				}
			}
			if ( action === 'filterChange' ) {
				setFilterList( tableState.filterList );
				localStorage.setItem( `filterList${uniqueKey}`, JSON.stringify( tableState.filterList ) );
				return;
			}
			if ( action === 'search' ) {
				localStorage.setItem( `searchText${uniqueKey}`, JSON.stringify( tableState.searchText ) );
				return;
			}
			if ( action === 'sort' ) {
				const fieldName = columns[tableState.activeColumn].name;
				const direction = tableState.announceText.includes( 'descending' ) ? 'desc' : 'asc';
				const option = {
					name: fieldName,
					direction
				};

				localStorage.setItem( `sortingOptions${uniqueKey}`, JSON.stringify( option ) );
				setSortingOptions( option );
				return;
			}
		},
		customSort: ( data, colIndex, client ) => data.sort( ( a, b ) => {
			const aVal = a.data[colIndex];
			const bVal = b.data[colIndex];

			if ( aVal < bVal ) {
				return -1 * ( client === 'desc' ? -1 : 1 );
			} else if ( aVal > bVal ) {
				return 1 * ( client === 'desc' ? -1 : 1 );
			} else {
				return 0;
			}
		}
		),
		textLabels: {
			body: {
				noMatch: 'Nessun oggetto trovato',
			}
		},
		customFooter: ( count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels ) => paginationOption ?
			<DataTableFooter
				count={ count }
				page={ page }
				rowsPerPage={ rowsPerPage }
				changeRowsPerPage={ changeRowsPerPage }
				changePage={ changePage }
				textLabels={ textLabels }
			/> :
			false,
	};

	return (
		<div>
			{ tableData && <MUIDataTable
				className={ isFiltersOpen ? 'withFilters' : 'noFilters' }
				key={ uniqueKey }
				data={ tableData?.length > 0 ?
					tableData.map( item => ( {
						...item,
						options: <Link to={ detailsLink ? `${detailsLink}/${item?.id}` : `${pathname}/${item?.id}` }>
							<img className='eye-icon' src={ EyeIcon } alt="details" />
						</Link>
					} ) ) :
					[] }
				columns={ appendFilterListToColumns(
					columns,
					filterList
				) }
				options={ options }
			/>}
		</div>
	);
};

export default DataTableCustomized;
