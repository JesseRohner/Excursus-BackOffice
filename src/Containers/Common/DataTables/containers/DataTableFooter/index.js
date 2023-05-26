import {
	TableCell, TableFooter, TableRow
} from '@material-ui/core';
import clx from 'classnames';

import { ReactComponent as ArrowIcon } from '../../../../../assets/svg/arrow-nero.svg';
import styles from './DataTableFooter.module.scss';

const DataTableFooter = ( {
	count, page, rowsPerPage, changeRowsPerPage, changePage, textLabels
} ) => {
	const currentPage = page + 1;
	const pagesNum = Math.ceil( count / rowsPerPage );

	return (
		<TableFooter>
			<TableRow>
				<TableCell colSpan={ 6 }>
					<div className={ styles.pagination }>
						<button
							className={ clx( styles.arrow__back, { [styles.btn__disabled]: page === 0 } ) }
							disabled={ page === 0 }
							onClick={ () => changePage( ( page - 1 ) ) }>
							<ArrowIcon />
						</button>
						<span className={ styles.text }><b>{ currentPage }</b>&nbsp;/&nbsp;{ pagesNum }</span>
						<button
							className={ clx( styles.arrow__next, { [styles.btn__disabled]: currentPage + 1 > pagesNum } ) }
							disabled={ currentPage + 1 > pagesNum }
							onClick={ () => changePage( ( page + 1 ) ) }
						>
							<ArrowIcon />
						</button>
					</div>
				</TableCell>
			</TableRow>
		</TableFooter>
	);
};

export default DataTableFooter;
