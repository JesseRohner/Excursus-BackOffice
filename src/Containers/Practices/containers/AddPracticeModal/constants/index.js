import * as yup from 'yup';

export const FORM_LISTS = {
	PRACTICE_TYPES: 'PRACTICE_TYPES',
	CUSTOMERS: 'CUSTOMERS',
	DETECTIVES: 'DETECTIVES',
	STORES: 'STORES',
	DOCUMENTS: 'DOCUMENTS',
	CHIEF: 'CHIEF'
};

export const INITIAL_VALUES = {
	title: '',
	description: '',
	type_ids: [],
	customer_id: '',
	store_ids: [],
	detective_ids: [],
	document: {
		description: '',
		type_id: '',
	}
};

const DEFAULT_VALIDATION_SCHEMA = {
	title: yup
		.string( 'Enter title' )
		.required( 'Title is required' ),
	description: yup
		.string( 'Enter description' )
		.required( 'Description is required' ),
	type_ids: yup
		.array()
		.min( 1, 'Choose one type' )
		.required( 'Type is required' ),
	store_ids: yup
		.array()
		.min( 1, 'Choose at least one store' )
		.required( 'Stores are required' ),
	detective_ids: yup
		.array()
		.min( 1, 'Choose at least one detective' )
		.required( 'Stores are required' ),
	customer_id: yup
		.string( 'Choose customer' )
		.required( 'Customer is required' ),
};

export const VALIDATION_SCHEMA_EDIT_FORM = yup.object().shape({
	...DEFAULT_VALIDATION_SCHEMA
} );

export const VALIDATION_SCHEMA_ADD_FORM = yup.object().shape({
	...DEFAULT_VALIDATION_SCHEMA,
	document: yup
		.object().shape( {
			description: yup.string( 'Enter description' )
				.required( 'A document type, description and file are required' ),
			type_id: yup.string( 'Choose document type' )
				.required( 'A document type, description and file are required' ),
		}),
});
