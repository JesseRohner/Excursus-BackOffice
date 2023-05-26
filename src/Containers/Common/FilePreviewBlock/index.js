import { ReactComponent as ArrowIcon } from '../../../assets/svg/arrow-small.svg';
import PDFViewer from '../PDFViewer';
import styles from './FilePreviewBlock.module.scss';

const FilePreviewBlock = ( { isFileFullSize, setIsFileFullSize } ) => {
	const fileType = isFileFullSize ? isFileFullSize?.split( ';' )[0].split( '/' ) : false;

	return <div className={ styles['file__full-size'] }>
		<ArrowIcon
			onClick={ () => setIsFileFullSize( false ) }
			className={ styles.arrow__btn }
		/>
		<div className={styles.file__wrapper}>
			{ fileType[1] === 'pdf' ?
				<PDFViewer pageWidth={ 500 } pdf={ isFileFullSize } isFullView={ true } /> :
				fileType[0]?.includes( 'video' ) ?
					<video src={isFileFullSize} className={ styles['uploaded-file'] } controls/> :
					<img src={ isFileFullSize } alt=''
						className={ styles['uploaded-file'] } /> }
		</div>
	</div>;
};

export default FilePreviewBlock;
