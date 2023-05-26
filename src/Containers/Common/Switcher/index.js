import React from 'react';

import styles from './Switcher.module.scss';

export default ({
	                value,
	                setValue,
	                label
}) => (
	<>
		<label className={ styles['field__label'] }>
			{ label }
		</label>
		<div className={styles.switcher__wrapper}>
			<div
				className={styles.switcher__button}
				style={{
					borderRadius: '7px 0 0 7px',
					color: value ? 'white' : 'black',
					backgroundColor: value ? 'black' : 'white',
				}}
				onClick={() => setValue(true)}
			>
				Yes
			</div>
			<div
				className={styles.switcher__button}
				style={{
					borderRadius: '0 7px 7px 0',
					color: !value ? 'white' : 'black',
					backgroundColor: !value ? 'black' : 'white',
				}}
				onClick={() => setValue(false)}
			>
				No
			</div>
		</div>
	</>
);
