import clx from 'classnames';
import React, { useState } from 'react';
import {
	Document, Page, pdfjs
} from 'react-pdf';

import Spinner from '../Spinner';
import styles from './PDFViewer.module.scss';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;

const PDFViewer = ({
	pdf, pageWidth = 280, isFullView=false
}) => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess( { numPages } ) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	function changePage(offset) {
		setPageNumber(prevPageNumber => prevPageNumber + offset);
	}

	function previousPage( e ) {
		e.preventDefault();
		changePage(-1);
	}

	function nextPage( e ) {
		e.preventDefault();
		changePage(1);
	}

	return (
		<div className={ clx( styles['pdf-preview__wrap'], { [styles['pdf-preview__full']]: isFullView })}>
			<Document
				file={pdf}
				onLoadSuccess={ onDocumentLoadSuccess }
				loading={<div><Spinner/></div>}
			>
				<Page width={ pageWidth } pageNumber={ pageNumber || 1 }
					renderAnnotationLayer={ false }
					renderTextLayer={false}
				/>
			</Document>
			{ isFullView && <div className={styles.file__info}>
				<p>
					Page
					<input
						className={styles['page-count']}
						value={ pageNumber }
						onChange={e => setPageNumber(+e.target.value)}
					/>of { numPages || '-' }
				</p>
				<div className={styles.info__actions}>
					<button disabled={ pageNumber <= 1 } onClick={ previousPage }>
						Prev
					</button>
					<button
						disabled={ pageNumber >= numPages }
						onClick={ nextPage }
					>
						Next
					</button>
				</div>
			</div> }
		</div>
	);
};

export default PDFViewer;
