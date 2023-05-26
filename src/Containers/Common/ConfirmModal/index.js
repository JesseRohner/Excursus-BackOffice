import PrimaryButton from '../Buttons/PrimaryButton';
import Modal from '../Modal';
import styles from './ConfirmModal.module.scss';

const ConfirmModal = ( {
	isModalOpen,
	setIsModalOpen,
	title,
	content,
	actionButton
} ) => <Modal
	width='330px'
	height={ content ? '300px' : '230px' }
	isModalOpen={ isModalOpen }
	setIsModalOpen={ setIsModalOpen }>
	<div className={styles.modal__content}>
		<h3>{ title }</h3>
		{content}
		<div className={styles.modal__actions}>
			{ actionButton }
			<PrimaryButton
				text='Annul'
				background='transparent'
				padding='8px'
				height='auto'
				fontSize='15px'
				width='180px'
				color='#AEAEB2'
				onClick={() => setIsModalOpen(false)}
			/>
		</div>
	</div>
</Modal>;

export default ConfirmModal;
