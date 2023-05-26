import SideBar from '../../SideBar';
import styles from './PageWrapper.module.scss';

const PageWrapper = ( {children}) => ( <div className={ styles['page-wrapper'] }>
	<SideBar/>
	<div className={styles.section__wrapper}>
		<section>
			{children}
		</section>
	</div>
</div> );

export default PageWrapper;
