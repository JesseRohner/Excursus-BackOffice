import { createSelector } from 'reselect';

const selectDashboardState = state => state.dashboardReducer;

export const getHomePageInfo = () => createSelector(selectDashboardState, state => state.homeInfo);
