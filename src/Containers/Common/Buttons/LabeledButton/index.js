import clx from 'classnames';

import styles from './LabeledButton.module.scss';

const LabeledButton = ( {
	label,
	text,
	isActive,
	onClick,
	isError,
	height = '40px',
	disabled,
	boxShadow
} ) => (
	<div className={ styles['labeled-btn__wrapper'] }>
		<span className={ styles['labeled-btn__label'] }>{ label }</span>
		<button
			className={ clx( styles['labeled-btn'], { [styles['labeled-btn__active']]: isActive } ) }
			onClick={ e => {
				e.preventDefault();
				onClick();
			} }
			style={ {
				height,
				boxShadow
			} }
			disabled={ disabled }
		>
			{ text }
		</button>
		{ isError && <div
			className={ styles.error }
		>
			{ isError }
		</div> }
	</div>
);

export default LabeledButton;
