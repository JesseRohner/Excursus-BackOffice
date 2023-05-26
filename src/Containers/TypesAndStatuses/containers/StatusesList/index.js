import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {statusesActions} from '../../store';
import {getAllStatuses} from '../../store/selectors';

export default () => {
	const dispatch = useDispatch();
	const allStatuses = useSelector( getAllStatuses() );

	useEffect( () => {
		dispatch( statusesActions.GET_ALL_STATUSES.REQUEST() );
	}, [ dispatch ] );
	console.log(allStatuses);
	return (
		<>
			<div>Statuses</div>
			{
				allStatuses.map(status => <div key={status.id} style={{color: status.color}}>{status.name}</div>)
			}
		</>
	);
};
