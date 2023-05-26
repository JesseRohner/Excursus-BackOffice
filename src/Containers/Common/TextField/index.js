import clx from 'classnames';
import { useEffect, useState } from 'react';

import { ReactComponent as EyeIcon } from '../../../assets/svg/eye.svg';
import styles from './TextField.module.scss';

const TextField = ( {
	field,
	form: { touched, errors },
	className,
	label,
	type = 'text',
	inputColor = '#ffff',
	borderRadius = '8px',
	border='none',
	readonly,
	textarea = false,
	height = '40px',
	showPassword = false,
	iconComponent,
	...props
} ) => {
	const [ inputType, setInputType ] = useState( type );
	const isError = touched[field.name] && errors[field.name];

	useEffect( () => {
		setInputType(type);
	}, [type]);

	return (
		<div className={ clx(
			styles.field__wrapper,
			styles[`${className}`],
			{ [styles['full-height']]: textarea && height === '100%' },
		) }>
			{ label && <label className={ styles['field__label'] }
				htmlFor={ field.name }
			>
				{ label }
			</label> }
			{ textarea ?
				<textarea
					className={ clx( styles['field__textarea'], { [styles['error-textarea']]: isError} ) }
					{ ...field }
					{ ...props }
					style={ {
						borderRadius,
						border,
						height,
						background: `${inputColor}`
					} }
				/> :
				<div className={ clx( styles['input-group'], { [styles['error-field']]: isError } ) }
					style={ {
						borderRadius,
						height,
						background: `${inputColor}`
					} }
				>
					<input
						className={ styles['field__input'] }
						type={ inputType }
						{ ...field }
						{ ...props }
						style={ {
							background: `${inputColor}`
						} } />
					{ showPassword && <EyeIcon className={ !isError ? styles['show-pwd-icon'] : styles['show-pwd-icon__red'] }
						onClick={ () => {
							if ( inputType === 'password' ) {
								setInputType( 'text' );
							} else {
								setInputType( 'password' );
							}
						}}
					/> }
					{iconComponent}
				</div>
			}
			{ isError && <div
				className={ styles.error }
			>
				{ errors[field.name] }
			</div> }
		</div>
	);
};

export default TextField;
