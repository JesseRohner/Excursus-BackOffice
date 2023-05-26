import Label from '../../../Common/Label';
import SectionWrapper from '../SectionWrapper';
import styles from './ActivitySection.module.scss';

const ActivitySection = () => (
	<SectionWrapper count={5} title='Activity'>
		<div className={styles.activity__panel}>
			<div className={styles.panel__block}>
				<h3 className={styles.block__title}>7 SEPTEMBER</h3>
				<div className={styles.activities__list}>
					<div className={styles.activity__wrapper}>
						<div className={styles.activity__inner}>
							<div className={styles.activity__content}>
								<div className={styles.activity__header}>
									<span className={styles.text__role}>CUSTOMER &bull;&nbsp;</span>
									<span className={styles.text__id}>ID-2345654 Surname</span>
									<span>&nbsp;&#9656;&nbsp;Action carried out</span>
								</div>
								<p className={ styles.activity__text }>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
									Vitae morbi justo malesuada id gravida quis integer turpis.
								</p>
							</div>
							<Label
								content='11:00 PM'
								background='#E4DAFF'
								color='#8944AB'
								width='92px'
								height='40px'
								fontSize='17px'
								borderRadius='7px'
								padding='0'
							/>
						</div>
						<span className={styles.divider}/>
					</div>
					<div className={styles.activity__wrapper}>
						<div className={styles.activity__inner}>
							<div className={styles.activity__content}>
								<div className={styles.activity__header}>
									<span className={styles.text__role}>CUSTOMER &bull;&nbsp;</span>
									<span className={styles.text__id}>ID-2345654 Surname</span>
									<span>&nbsp;&#9656;&nbsp;Action carried out</span>
								</div>
								<p className={ styles.activity__text }>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit.
								</p>
							</div>
							<Label
								content='11:00 PM'
								background='#E4DAFF'
								color='#8944AB'
								width='92px'
								height='40px'
								fontSize='17px'
								borderRadius='7px'
								padding='0'
							/>
						</div>
						<span className={styles.divider}/>
					</div>
				</div>
			</div>
		</div>
	</SectionWrapper>
);

export default ActivitySection;
