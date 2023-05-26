// To save the table state with filters and search

export const appendFilterListToColumns = ( columns, filterList ) => {
	if ( filterList ) {
		filterList.forEach( ( filter, index ) => {
			if ( !columns[index]?.options ) {
				let filters = {
					filter: true,
					filterList: []
				};
				columns[index].options = filters;
			}
			if ( filter && ( filter.length > 0 ) ) {
				columns[index].options.filterList = filter;
			}
		} );
	}
	return columns;
};

export const fileReaderToBase64 = async file => {
	const prom = file => new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	} );
	const uploadedFile = await prom( file[0] );
	return uploadedFile;
};

export const clearLocalStorageByTableKey = tableKey => {
	Object.entries(localStorage).map(([key]) => {
		const KEY = key.split('/').pop();
		if (KEY === tableKey) localStorage.removeItem(key);
		return key;
	} );
};
