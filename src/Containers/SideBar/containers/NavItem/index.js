import clx from 'classnames';
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';

import { ReactComponent as ArrowIcon } from '../../../../assets/svg/arrow-small.svg';
import styles from './NavItem.module.scss';

const NavItem = ({navItem, activeItem}) => {
	const navigate = useNavigate();
	const [ isSubMenuOpen, setIsSubMenuOpen ] = useState( false );

	useEffect( () => {
		if ( navItem?.children?.find( subItem => subItem.link === activeItem ) ) {
			setIsSubMenuOpen(true);
		}
	}, [ navItem, activeItem ] );

	return (
		<li
			className={ clx(
				styles.nav__item,
				{
					[styles['nav-item__active']]:
					activeItem?.includes( navItem.link ) || !!navItem?.children?.find( subItem => subItem.link === activeItem)
				}
			) }
		>
			{ navItem.children ?
				(
					<>
						<span className={ clx( styles.item__inner, styles['inner__complex'] ) }
							onClick={ () => setIsSubMenuOpen( s => !s )}
						>
							<span>{ navItem.label }</span>
							<ArrowIcon className={clx(styles.item__arrow, {[styles.arrow__rotate]: isSubMenuOpen})}/>
						</span>
						{ isSubMenuOpen &&
								<ul className={ styles['nav__sub-menu'] }>
									{ navItem.children.map( ( subItem, idx ) => (
										<li
											key={ idx }
											onClick={ () => navigate( subItem.link ) }
											className={ clx(
												styles['nav__sub-item'],
												{ [styles['sub-item__active']]: activeItem === subItem.link }
											) }
										>
											<span>{ subItem.label }</span>
											<ArrowIcon className={styles.item__arrow}/>
										</li>
									) )
									}
								</ul> }
					</>
				) :
				(
					<span className={ styles.item__inner }
						onClick={ () => navigate( navItem.link )}
					>
						<span>{ navItem.label }</span>
						<ArrowIcon className={styles.item__arrow}/>
					</span>
				)
			}
		</li>

	);
};

export default NavItem;
