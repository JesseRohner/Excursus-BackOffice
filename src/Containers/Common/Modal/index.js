import CloseIcon from '../../../assets/svg/close.svg';
import styles from './Modal.module.scss';

const Modal = ({
	isModalOpen,
	setIsModalOpen,
	children,
	height = 'auto',
	width = 'fit-content',
	showCloseBtn = false
} ) => (
	<>
		{isModalOpen && (
			<div className={styles.modal__wrapper}>
				<div
					className={ styles.modal }
					style={ {
						width,
						height
					}}
				>
					{ showCloseBtn && <div className={ styles.modal__header } onClick={ setIsModalOpen }>
						<img src={ CloseIcon } alt='close' />
					</div>
					}
					{children}
				</div>
			</div>
		)}
	</>
);

export default Modal;
