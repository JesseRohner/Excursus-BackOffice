import {
	useEffect, useRef, useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';

import LogoImage from '../../assets/images/logo.png';
import { ReactComponent as CrownIcon } from '../../assets/svg/crown.svg';
import LogoutIcon from '../../assets/svg/logout.svg';
import useOutsideClick from '../../utils/useOutsideClick';
import { actions } from '../Auth/store/actions';
import {getUser} from '../Auth/store/selectors';
import SecondaryButton from '../Common/Buttons/SecondaryButton';
import { NAV_BAR_ROUTES } from './constants';
import NavItem from './containers/NavItem';
import styles from './SideBar.module.scss';

const SideBar = () => {
	const dispatch = useDispatch();
	let location = useLocation();
	const user = useSelector(getUser());
	const dropdownRef = useRef();
	const [ activeItem, setActiveItem ] = useState('');
	const [ isDropdownOpen, setIsDropdownOpen ] = useState( null );

	useEffect( () => {
		if ( location ) {
			setActiveItem(location.pathname);
		}
	}, [ location ] );

	useOutsideClick( dropdownRef, () => {
		if ( isDropdownOpen ) setIsDropdownOpen( false );
	} );


	return (
		<aside className={ styles.sidebar__wrapper }>
			<div className={ styles.sidebar__inner }>
				<div className={styles.logo__wrapper}>
					<img src={ LogoImage } alt='logo' className={styles.logo}/>
				</div>
				<div onClick={() => setIsDropdownOpen( true )} className={ styles['user-info']}>
					<CrownIcon className={styles.user__image}/>
					<p>{ user?.first_name } { user?.last_name }</p>
					{ isDropdownOpen && <div ref={ dropdownRef } className={ styles.dropdown__menu }>
						<SecondaryButton
							height='20px'
							leftIconSrc={ LogoutIcon }
							text='Logout'
							fontSize='12px'
							color='#D70015'
							onClick={() => dispatch(actions.LOG_OUT.REQUEST())}
						/>
					</div> }
				</div>

				<nav className={ styles['nav-bar'] }>
					<ul>
						{
							NAV_BAR_ROUTES.map( ( navItem, idx ) => (
								<NavItem key={ idx } navItem={ navItem } activeItem={activeItem}/>
							) )
						}
					</ul>
				</nav>
			</div>
		</aside>
	);
};

export default SideBar;
