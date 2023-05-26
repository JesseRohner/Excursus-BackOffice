import Label from '../../../Common/Label';
import styles from './MonitoringSection.module.scss';

const MonitoringSection = ({statuses}) => <section className={ styles.monitoring__section }>
	<h2>Monitoring of Practices</h2>
	<div className={ styles.monitoring__panel }>
		{ statuses?.map( status => (
			<div key={ status.id } className={ styles.panel__info }>
				<Label
					content={ status?.name }
					background={ status?.color }
					color='#FFFF'
					padding='5px'
					width='100px'
					height='26px'
				/>
				<p className={ styles.info__count }>{ status?.practice_count }</p>
			</div>
		))}
	</div>
</section>;

export default MonitoringSection;
