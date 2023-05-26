import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';

import PlusIcon from '../../../../../assets/svg/plus-circle.svg';
import PrimaryButton from '../../../../Common/Buttons/PrimaryButton';
import {TABLE_KEYS} from '../../../../Common/DataTables/constants';
import CustomersTable from '../../../../Tables/CustomersTable';
import { customerActions } from '../../../store';
import {getAllCustomers} from '../../../store/selectors';
import CustomerModal from '../Modals/CustomersModal';
import styles from './CustomersList.module.scss';

export default () => {
	const dispatch = useDispatch();
	const customersList = useSelector(getAllCustomers());
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {pathname} = useLocation();
	useEffect( () => {
		dispatch( customerActions.GET_ALL_CUSTOMERS.REQUEST() );
	}, [ dispatch ] );
	return (
		<div className={ styles.container__inner }>
			<div className={ styles.container__header }>
				<h2>Customers</h2>
				<PrimaryButton
					height='34px'
					fontSize = '13px'
					padding = '8px 10px'
					text='Add Customer'
					leftIconSrc={PlusIcon}
					onClick={ () => setIsModalOpen(true)}
				/>
			</div>
			<CustomersTable
				customersList={ customersList }
				tableKey={`${pathname}/${TABLE_KEYS.CUSTOMER}`}
				paginationOption={true}
			/>
			<CustomerModal isCustomerModalOpen={ isModalOpen } setIsCustomerModalOpen={setIsModalOpen}/>
		</div>
	);
};
