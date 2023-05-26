import clx from 'classnames';

import styles from './SecondaryButton.module.scss';

const SecondaryButton = ( {
	height = '50px',
	width='auto',
	color = '#078EA6',
	fontSize = '24px',
	text,
	leftIconSrc,
	outlined = false,
	onClick,
	className
}) => (
	<button
		style={{
			height,
			width,
			fontSize,
			color
		}}
		className={clx(
			styles.secondary__btn,
			{[styles.outlined]: outlined},
			styles[`${className}`]
		)}
		onClick={onClick}
	>
		{leftIconSrc && <img src={leftIconSrc} alt='icon'/>}
		{text}
	</button>
);

export default SecondaryButton;
