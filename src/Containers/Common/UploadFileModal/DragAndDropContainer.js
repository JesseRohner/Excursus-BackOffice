import clx from 'classnames';
import get from 'lodash/get';
import React, { useRef, useState } from 'react';

import { fileValidator, preventBrowserDefaults } from '../../../utils/dragAndDrop';
import styles from './UploadFileModal.module.scss';

const DragAndDrop = ({
	children,
	setUploadFiles,
	setError
} ) => {
	const config = {
		fileSizeMBLimit: 60,
		filesLimit: 1
	};

	let [dragOverlay, setDragOverlay] = useState(false);
	let dragCounter = useRef(0);

	const handleDrag = e => {
		preventBrowserDefaults(e);
	};

	const handleDragIn = e => {
		preventBrowserDefaults(e);
		dragCounter.current++;
		if (get(e, 'dataTransfer.items.length') > 0) {
			setDragOverlay(true);
		}
	};
	const handleDragOut = e => {
		preventBrowserDefaults(e);
		dragCounter.current--;
		if (dragCounter.current === 0) {
			setDragOverlay(false);
		}
	};
	const handleDrop = e => {
		const files = get(e, 'dataTransfer.files');
		preventBrowserDefaults(e);
		setDragOverlay(false);
		setError(false);
		dragCounter.current = 0;
		const { isValidFile, errVal } = fileValidator(files, config);
		if (!isValidFile) {
			if (errVal) {
				setError(errVal);
			}
			return false;
		}
		fileReader(files);
	};

	const fileReader = files => {
		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = loadEvt => {
			setUploadFiles(prevState => [...prevState, loadEvt.target.result]);
		};
	};

	return (
		<div
			className={clx(styles['drag-container'], `${dragOverlay ? 'overlay' : ''}`)}
			onDragEnter={handleDragIn}
			onDragLeave={handleDragOut}
			onDragOver={handleDrag}
			onDrop={handleDrop}
		>
			{children}
		</div>
	);
};

export default DragAndDrop;
