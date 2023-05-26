
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { actions } from '../Containers/Auth/store';

function useAuth() {
	const dispatch = useDispatch();
	const [ isLoading, setIsLoading ] = useState( true );

	useEffect( () => {
		const token = localStorage.getItem( 'jwtToken' );
		if ( token ) {
			const decode = jwtDecode( token );
			const date = new Date().getTime();
			if ( decode.exp < date ) {
				localStorage.removeItem( 'jwtToken' );
				dispatch( actions.LOG_OUT.SUCCESS() );
				setIsLoading( false );
			} else {
				localStorage.setItem( 'jwtToken', token );
				dispatch( actions.SIGN_IN.SUCCESS( { data: decode.data, token }) );
				setIsLoading( false );
			}
		} else {
			setIsLoading( false );
			dispatch( actions.LOG_OUT.SUCCESS() );
		}
	}, [ dispatch ] );

	return {isLoading};
}

export default useAuth;
