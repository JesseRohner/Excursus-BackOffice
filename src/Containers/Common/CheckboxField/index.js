import clx from 'classnames';

import styles from './CheckboxField.module.scss';

const CheckboxField = ( {
	isSelected,
	field,
	id,
	label,
	form,
	...props
} ) => (
	<>
		<label className={ clx(styles['checkbox__wrapper'], {[styles['checkbox__selected-value']]: isSelected}) }>
			<span>{ label }</span>
			<input
				{ ...field }
				id={ id }
				type="checkbox"
				value={ id }
				className={ styles['checkbox__field'] }
				{ ...props }
			/>
		</label>
	</>
);

export default CheckboxField;
