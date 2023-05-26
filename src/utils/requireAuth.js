import { useSelector } from 'react-redux';

import { getAuth } from '../Containers/Auth/store/selectors';

export default ComposedComponent => props => {
	const isAuthenticated = useSelector(getAuth());

	return isAuthenticated ? <ComposedComponent {...props} /> : null;
};
