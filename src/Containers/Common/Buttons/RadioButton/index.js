import styles from './RadioButton.module.scss';

const RadioButton = ( {
	field: {
		name, value, onChange, onBlur
	},
	id,
	label,
	...props
} ) => (
	<label className={ styles['radio-btn'] }>
		<span>{ label }</span>
		<input
			name={ name }
			id={ id }
			type="radio"
			value={ id }
			checked={ +id === +value }
			onChange={onChange}
			onBlur={ onBlur }
			className={ styles['radio-btn__input'] }
			{ ...props }
		/>
	</label>

);

export default RadioButton;
