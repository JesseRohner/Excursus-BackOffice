import styles from './Spinner.module.scss';

const Spinner = () => <div className={ styles.loader }>
	<div className={ styles.spinner__wrapper }>
		<div className={ styles.spinner }/>
	</div>
</div>;


export default Spinner;
