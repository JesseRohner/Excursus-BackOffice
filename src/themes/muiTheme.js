import { createTheme } from '@material-ui/core/styles';

const colors = {
	black: '#2E3338',
	viola: '#8944AB',
	backViols: '#E4DAFF',
	darkBlue: '#0040DD',
	middleGray: '#DCDFE3',
	textGray: '#AEAEB2',
	gray: 'rgba(46, 51, 56, 0.9)',
	green: '#248A3D',
	red: '#D70015',
	lightBlue: '#D9EBFF',
	blueHover: '#007AFF',
	blue: '#409CFF',
	white: '#FFFFFF',
	clearGray: '#F6F7F8',
	yellow: '#F5E23D',
	clearWhite: '#FAFAFA',
	darkGray: '#22262A'
};

const muiTheme = createTheme( {
	overrides: {
		MuiPaper: {
			root: {
				boxShadow: 'none',
				backgroundColor: colors.white,

				'&.noFilters': {
					'& .MuiToolbar-root': {
						display: 'none'
					},
					'& .MuiTableHead-root tr': {
						'& th:first-child': {
							borderRadius: '8px 0 0 0'
						},
						'& th:last-child': {
							borderRadius: '0 8px 0 0'
						}
					}
				},
				'&.withFilters': {
					'& .MuiTableHead-root': {
						display: 'table-header-group'
					},
				}
			},
			elevation4: {
				boxShadow: 'none',
			},
			rounded: {
				borderRadius: '0'
			}
		},
		MuiTableCell: {
			root: {
				wordBreak: 'break-word',
				'&.centeredHeader': {
					'& span': {
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					},
					'& div': {
						display: 'flex',
						textAlign: 'center',
						justifyContent: 'center',
						alignItems: 'center',
					}
				},
				'&.centeredColumn': {
					textAlign: 'center'
				},
				'&.boldHeader': {
					'& div': {
						fontWeight: '500'
					}
				}
			},
			footer: {
				display: 'flex',
				backgroundColor: colors.clearGray,
				justifyContent: 'flex-end',
				borderRadius: '0 0 8px 8px',
				borderBottom: 'none'
			}
		},
		MUIDataTableHeadCell: {
			root: {
				'& > div': {
					color: colors.white,
				}
			},
			data: {
				fontWeight: '500',
				color: colors.white,
			},
			fixedHeader: {
				backgroundColor: colors.black,
			},
			sortActive: {
				color: colors.white,
			},
			toolButton: {
				'&:hover': {
					backgroundColor: colors.clearGray,

					'& *': {
						color: colors.black
					}
				}
			},
			sortAction: {
				display: 'flex',
				alignItems: 'center',

				'& svg path': {
					color: colors.white,
				},
			},
		},
		MUIDataTableSelectCell: {
			headerCell: {
				backgroundColor: colors.black,

				'& svg path': {
					color: colors.white,
				}
			}
		},
		MUIDataTableToolbar: {
			root: {
				backgroundColor: colors.black,
				borderRadius: '8px 8px 0 0'
			},
			filterPaper: {
				maxWidth: '20%',
				'& > div': {
					paddingTop: '48px',
				}
			},
			actions: {
				'& svg path': {
					color: colors.white,
				}
			}
		},
		MUIDataTableSearch: {
			main: {
				display: 'flex',
				alignItems: 'center',

				'& *': {
					color: colors.white,
				}
			},
			searchIcon: {
				marginTop: '0'
			},
			clearIcon: {
				'& *': {
					color: colors.white,
				}
			}
		},
		MUIDataTableToolbarSelect: {
			root: {
				backgroundColor: colors.black,

				'& *': {
					color: colors.white,
				}
			}
		},
		MUIDataTableFilterList: {
			root: {
				backgroundColor: colors.black,
				margin: '0',
				padding: '0 16px',
			},
			chip: {
				backgroundColor: colors.white,

				'& span': {
					color: colors.black,
				},
			}
		},
		MUIDataTableFilter: {
			root: {
				backgroundColor: colors.clearGray,

				'& .MuiGrid-root': {
					maxWidth: 'none',
					padding: '0',
					marginTop: '10px'
				},

			},
		},
	},
});

export default muiTheme;
