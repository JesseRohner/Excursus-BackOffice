

export const actions = {};
export const types = {};


const actionCreator = actionTypes => {
	const TYPES = [
		'REQUEST',
		'SUCCESS',
		'FAILED',
		'CLEAR'
	];

	const createTypes = typeString =>
		TYPES.reduce((type, key) => {
			type[key] = `${typeString}_${key}`;
			return type;
		}, {});

	const createActions = typeString =>
		TYPES.reduce((type, key) => {
			type[key] = ( payload = {}, callback, options ) => ( {
				type: `${typeString}_${key}`,
				payload,
				callback,
				options,
			} );
			return type;
		}, {});


	return ( {
		actions: actionTypes.reduce( ( allTypes, type ) => ( {
			...allTypes,
			[type]: {
				...createActions( type )
			}
		}), {} ),
		types: actionTypes.reduce( ( allTypes, type ) => ({
			...allTypes,
			[type]: { ...createTypes( type ) }
		}), {}),
	});
};


export default actionCreator;
