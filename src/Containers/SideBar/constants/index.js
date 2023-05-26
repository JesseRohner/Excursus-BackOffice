import { ROUTES } from '../../../routes/constants';

export const NAV_BAR_ROUTES = [
	{
		label: 'DASHBOARD',
		link: ROUTES.DASHBOARD,
	},
	{
		label: 'PRACTICES',
		children: [
			{
				label: 'All Practices',
				link: ROUTES.PRACTICES
			},
			{
				label: 'In Pending',
				link: `${ROUTES.PRACTICES}/pending`
			},
		]
	},
	{
		label: 'CUSTOMERS',
		children: [
			{
				label: 'Customers',
				link: ROUTES.CUSTOMERS
			},
			{
				label: 'Stores',
				link: ROUTES.STORES
			},
			{
				label: 'Zone Chief Managers',
				link: ROUTES.CHIEF_MANAGERS
			},
		]
	},
	{
		label: 'INTEGRATION',
		children: [
			{
				label: 'Statuses',
				link: `${ROUTES.INTEGRATION}/statuses`
			},
			{
				label: 'Services',
				link: `${ROUTES.INTEGRATION}/services`
			},
		]
	},
	{
		label: 'DETECTIVES',
		link: ROUTES.DETECTIVES,
	},
];
