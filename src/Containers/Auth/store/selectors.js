import { createSelector } from "reselect";

const selectUsersState = (state) => state.authReducer;

export const getAuth = () =>
  createSelector(selectUsersState, (state) => state.isLogin);
export const getUser = () =>
  createSelector(selectUsersState, (state) => state.user);
