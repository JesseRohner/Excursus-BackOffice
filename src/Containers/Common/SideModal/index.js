import styles from './SideModal.module.scss';

const SideModal = ( {
	children,
	isModalOpen,
	setIsModalOpen,
	width='auto'
} ) => ( <>
	{ isModalOpen && ( <div className={ styles.modal__wrapper }>
		<div className={ styles.modal }
			style={ {
				width
			}}
		>
			{ children }
		</div>
	</div> )
	}
</> );

export default SideModal;
