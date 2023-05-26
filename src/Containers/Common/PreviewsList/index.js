import EyeIcon from '../../../assets/svg/eye.svg';
import PDFViewer from '../PDFViewer';
import styles from './PreviewsList.module.scss';

const PreviewsList = ({
	filesInfo, setFilesInfo, setIsFileFullSize, isFileFullSize, isEditForm=false
}) => <div className={ styles.preview__wrapper }>
	{ !isEditForm && <h2>Uploaded files</h2> }
	<div className={ styles['uploaded-files'] }>
		{ filesInfo?.map( ( file, idx ) => {
			const fileType = file?.url?.split( ';' )[0].split( '/' );

			return (<div key={ idx } className={ styles['uploaded-file__wrapper'] }>
				<div className={ styles['uploaded-file__header']}>
					<span className='checked__btn'
						onClick={ () => {
							if ( isEditForm ) {
								setFilesInfo(prevState => [...prevState, file?.id]);
							} else {
								const filteredFiles = filesInfo?.filter( ( file, i ) => i !== idx );
								setFilesInfo( filteredFiles || [] );
								if ( isFileFullSize === file?.url ) {
									setIsFileFullSize(false);
								}
							}
						} }
					/>
				</div>
				{ fileType[1] === 'pdf' ?
					<PDFViewer pdf={ file?.url } /> :
					fileType[0]?.includes( 'video' ) ?
						<video src={file?.url} className={ styles['uploaded-file'] }/> :
						<img src={ file?.url } alt='file'
							className={ styles['uploaded-file'] } />
				}
				<div className={ styles['uploaded-file__footer']}>
					<span className={styles['footer__type']}>{fileType[1]}</span>
					<img className='eye-icon' src={ EyeIcon } alt="details"
						onClick={() => setIsFileFullSize(file?.url)}
					/>
				</div>
			</div>);
		})
		}
	</div>
</div>;

export default PreviewsList;
