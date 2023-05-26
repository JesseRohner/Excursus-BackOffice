import { useSelector } from 'react-redux';
import {
	Navigate, useLocation
} from 'react-router-dom';

import { getUser } from '../../Containers/Auth/store/selectors';
import { ROUTES} from '../constants';

export const PrivateRoute = ({
	component: RouteComponent, roles, isAuthenticated
}) => {
	let location = useLocation();
	const user = useSelector( getUser() );
	const userHasRequiredRole = user && !!roles.filter( role => +role.id === +user.role_id ).length;

	if ( !isAuthenticated ) {
		return <Navigate to={ROUTES.SIGN_IN} state={{ from: location }} />;
	}

	if (isAuthenticated && !userHasRequiredRole) {
		return <div>access denied</div>;
	}

	return <RouteComponent/>;
};

