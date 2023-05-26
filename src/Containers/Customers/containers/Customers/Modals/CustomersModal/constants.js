import * as yup from 'yup';

const defaultValidationSchema = {
	first_name: yup.string('Must be a string').min(2, 'Too Short!').max(255, 'Too Long!').required('required'),
	last_name: yup.string('Must be a string').min(1, 'Too Short!').max(255, 'Too Long!').required('required'),
	phone: yup.string().min(3).max(20)
		.matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, 'Is not in correct format')
		.required('required'),
};

export const editValidationSchema = yup.object().shape({
	...defaultValidationSchema,
	password: yup.string('Must be a string').min(6).max(255).trim(),
	discount: yup.number('Must be a number').min(0).max(100),
	confirmPassword: yup.string().when('password', (password, field) =>
		password ? field.oneOf([yup.ref('password')]).required('required') : field
	)
});

export const createValidationSchema = yup.object().shape({
	...defaultValidationSchema,
	email: yup.string('Must be a string').trim().email('Please enter valid email').required('required'),
	password: yup.string('Must be a string').min(6).max(255).trim().required('required'),
	confirmPassword: yup.string('Must be a string')
		.min(6).max(255).trim().required('required').oneOf([yup.ref('password'), null], 'Passwords must match'),
	discount: yup.number('Must be a number').min(0).max(100)
});
