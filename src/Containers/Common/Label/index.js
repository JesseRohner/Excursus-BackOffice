import styles from './Label.module.scss';

const Label = ( {
	content = '',
	background = 'transparent',
	border = 'none',
	borderRadius = '5px',
	color = '#2E3338',
	height = 'auto',
	width = 'auto',
	padding = '10px',
	fontSize = '13px',
}) => (
	<div className={styles.label}
		style={ {
			background,
			border,
			borderRadius,
			color,
			width,
			height,
			padding,
			fontSize,
		}}>
		{content}
	</div>
);

export default Label;
