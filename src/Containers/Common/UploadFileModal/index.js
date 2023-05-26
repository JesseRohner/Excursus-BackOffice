import { useEffect, useState} from 'react';

import UploadIcon from '../../../assets/svg/upload.svg';
import {fileReaderToBase64} from '../../../helpers';
import { fileValidator } from '../../../utils/dragAndDrop';
import DragAndDropContainer from './DragAndDropContainer';
import styles from './UploadFileModal.module.scss';

const UploadFileModal = ({
	setUploadFiles, acceptedFileTypes
}) => {
	const [ error, setError ] = useState( false );
	const fileTypes = `image/*, application/pdf*, text/xml,
	doc, docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document`;
	useEffect( () => {
		if ( error ) {
			setTimeout( () => setError( false ), 3000 );
		}
	}, [ error ] );

	return <div className={styles['upload-file__wrapper']}>
		<DragAndDropContainer setUploadFiles={ setUploadFiles } setError={setError}>
			<div
				className={styles['upload-file__btn']}
			>
				<label htmlFor="file" className={styles['btn__label']}>
					<img src={ UploadIcon } alt="upload" />
					<span>UPLOAD</span>
					{ error && <p className={ styles.error }>{error}</p>}
				</label>
				<input
					style={ {
						width: '0.1px',
						height: '0.1px',
						opacity: '0',
						overflow: 'hidden',
						position: 'absolute',
						zIndex: '-1',
					} }
					onChange={ async e => {
						e.persist();
						const file = Object.values( e.target.files );
						if ( file ) {
							const { errVal } = fileValidator( file, { fileSizeMBLimit: 60 } );

							if ( errVal ) {
								setError( errVal );
								return;
							}

							const base64FileUrl = await fileReaderToBase64(
								file
							);
							setUploadFiles( prevState => ( [
								...prevState,
								{
									name: file[0].name.split( '.' )[0] || 'fileName',
									url: base64FileUrl
								}
							] ) );
						}
					} }
					name="file"
					id="file"
					type="file"
					accept={ acceptedFileTypes || fileTypes }
				/>
			</div>
		</DragAndDropContainer>
		<p className={styles.preview__text}>Max 60 MB</p>
	</div>;
};

export default UploadFileModal;
