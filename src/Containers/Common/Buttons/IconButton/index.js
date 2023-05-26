import clx from 'classnames';

import styles from './IconButton.module.scss';

const IconButton = ({
	height = '25px',
	width='25px',
	padding = '5px',
	borderRadius = '5px',
	backgroundColor='transparent',
	iconSrc,
	onClick,
}) => (
	<button
		style={{
			height,
			width,
			borderRadius,
			padding,
			backgroundColor
		}}
		className={clx(
			styles.icon__btn
		)}
		onClick={onClick}
	>
		<img className={styles['btn__icon']} src={iconSrc} alt='icon'/>
	</button>
);

export default IconButton;
