import React from 'react';
import { useSelector } from 'react-redux';

import Spinner
from '../../Containers/Common/Spinner';
import { getLoader } from './store/selectors';

export default () => {
	const loading = useSelector(getLoader());

	return loading ? <Spinner/> : null;
};
