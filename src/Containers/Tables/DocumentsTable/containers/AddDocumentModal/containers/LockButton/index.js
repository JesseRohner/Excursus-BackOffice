import LockIcon from '../../../../../../../assets/svg/lock-blue.svg';
import UnlockIcon from '../../../../../../../assets/svg/unlock.svg';
import styles from './LockButton.module.scss';

const LockButton = ( {
	field,
	id,
	label,
	form,
	...props
} ) => (
	<>
		<label className={ styles['checkbox__wrapper'] }>
			<p className={ styles['label__text'] }>
				<span>{ label }</span>
				<b>Can see the document or note</b>
			</p>
			<input
				{ ...field }
				id={ id }
				type="checkbox"
				className={ styles['checkbox__field'] }
				{ ...props }
			/>
			<span className={ styles['checkmark'] }>
				<img src={field?.value ? UnlockIcon : LockIcon} alt='lock'/>
			</span>
		</label>
		<p className={ styles.description }>
				If you click on the “Lock Icon” the { label } can&apos;t view this document or note.
		</p>
	</>
);

export default LockButton;
