import MUIDataTable from 'mui-datatables';
import {useState} from 'react';
import { Link, useLocation } from 'react-router-dom';

import EyeIcon from '../../../../../assets/svg/eye.svg';
import { ROUTES } from '../../../../../routes/constants';
import useWindowSize from '../../../../../utils/useWindowSize';
import DataTableFooter from '../DataTableFooter';
import OptionsTableHeadCell from '../OptionsTableHeadCell';

const DataTableDefault = ( {
	tableData,
	tableColumns,
	rowsPerPageNum = 10,
	detailsLink = false,
	uniqueKey,
	filterOption = true,
	selectableRowsOption = false,
	paginationOption = true,
	isDocumentsTable=false,
} ) => {
	const { isMobile } = useWindowSize();
	const [isFiltersOpen, setIsFilterOpen] = useState(false);
	const { pathname } = useLocation();

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
			setCellHeaderProps: () =>  ( { className: 'centeredHeader' } ),
			setCellProps: () => ( { className: 'centeredColumn' } ),
			customHeadRender: () => ( <OptionsTableHeadCell
				key={ tableColumns?.length }
				length={ tableColumns?.length }
				filterOption={ filterOption }
				setIsFilterOpen={ setIsFilterOpen }
			/>)
		}
	} ];

	const options = {
		filterType: 'checkbox',
		filter: filterOption,
		sort: true,
		searchOpen: true,
		responsive: 'vertical',
		selectableRows: selectableRowsOption && 'multiple',
		tableBodyMaxHeight: 'auto',
		rowsPerPage: rowsPerPageNum,
		rowsPerPageOptions: [],
		pagination: paginationOption,
		textLabels: {
			body: {
				noMatch: 'Nessun oggetto trovato',
			}
		},
		customFooter: ( count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels ) => paginationOption ?
			<DataTableFooter
				count={count}
				page={page}
				rowsPerPage={rowsPerPage}
				changeRowsPerPage={changeRowsPerPage}
				changePage={changePage}
				textLabels={textLabels}
			/> :
			false,
	};
	return (
		<div>
			{ tableData && <MUIDataTable
				className={ isFiltersOpen ? 'withFilters' : 'noFilters' }
				key={ uniqueKey }
				data={ tableData?.length > 0 ?
					tableData.map( item => {
						if ( pathname === ROUTES.DASHBOARD ) {
							return item;
						} else {
							return ( {
								...item,
								options: <Link to={ detailsLink ?
								`${detailsLink}/${item?.id}` :
									isDocumentsTable ?
										{
											pathname,
											search: `?document=${item?.id}`
										} :
								`${pathname}/${item?.id}` }>
									<img className='eye-icon' src={ EyeIcon } alt="details" />
								</Link>
							} );
						}
					}) :
					[] }
				columns={columns}
				options={ options }
			/>}
		</div>
	);
};

export default DataTableDefault;
