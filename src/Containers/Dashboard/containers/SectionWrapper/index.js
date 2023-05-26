import Label from '../../../Common/Label';
import styles from './SectionWrapper.module.scss';

const SectionWrapper = ({
	children, title, count
}) => (
	<section className={styles.section__wrapper}>
		<div className={styles.section__header}>
			<Label
				content={ `LAST ${count}` }
				background='#8944AB'
				color='#ffff'
				width='55px'
				height='22px'
				fontSize='11px'
				padding='0'
			/>
			<h2>{ title }</h2>
		</div>
		{children}
	</section>
);

export default SectionWrapper;
