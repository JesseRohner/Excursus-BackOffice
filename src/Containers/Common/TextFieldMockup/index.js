import styles from './TextFieldMockup.module.scss';

const TextFieldMockup = ({
	label,
	value,
	height='auto',
	bgColor = 'transparent',
	color = '#2E3338',
	borderRadius,
}) =>  (
	<div className={styles.field__wrapper}>
		<span className={styles['field__label']}>{label}</span>
		<div
			className={styles['field__value']}
			style={ {
				borderRadius: `${borderRadius}`,
				background: bgColor,
				color,
				height
			} }>
			{ value }
		</div>
	</div>
);

export default TextFieldMockup;
