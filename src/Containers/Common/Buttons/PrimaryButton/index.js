import clx from 'classnames';

import styles from './PrimaryButton.module.scss';

const PrimaryButton = ({
	background = '#2E3338',
	color = '#FFFF',
	height = '40px',
	width='auto',
	fontSize = '18px',
	padding = '8px',
	borderRadius = '7px',
	border,
	text,
	leftIconSrc,
	rightIconSrc,
	onClick,
	className,
	type,
	disabled
}) => (
	<button
		style={ {
			height,
			width,
			fontSize,
			borderRadius,
			border,
			padding,
			color,
			background
		} }
		className={ clx(
			styles.primary__btn,
			styles[`${className}`],
		) }
		onClick={ onClick }
		type={ type }
		disabled={disabled}
	>
		{leftIconSrc && <img className={styles['left-icon']} src={leftIconSrc} alt='icon'/>}
		<span>{text}</span>
		{rightIconSrc && <img className={styles['right-icon']} src={rightIconSrc} alt='icon'/>}
	</button>
);

export default PrimaryButton;
