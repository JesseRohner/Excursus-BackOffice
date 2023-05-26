import jwtDecode from "jwt-decode";
import { call, put, takeLatest } from "redux-saga/effects";

import { Api } from "../../../entries/ApiTransport";
import sagaAssessor from "../../../utils/sagaAssessor";
import { actions, types } from "./actions";

const api = Api.getInstance();

const signIn = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        console.log(payload);
        const { data } = yield call(() => api.post("login", payload));
        localStorage.setItem("jwtToken", data.token);
        const decode = jwtDecode(data.token);
        yield put(
          actions.SIGN_IN.SUCCESS({ data: decode.data, token: data.token })
        );
        callback && typeof callback === "function" && callback();
      },
    (err) => actions.SIGN_IN.FAILED(err)
  );

const getUser = ({ payload, callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const { data } = yield call(() =>
          api.get(`/admin/utenti/getUtente/${payload}`)
        );
        yield put(actions.FETCH_USER.SUCCESS(data.utente));
        callback && typeof callback === "function" && callback();
      },
    (err) => actions.FETCH_USER.FAILED(err)
  );

const logOut = ({ callback }) =>
  sagaAssessor(
    () =>
      function* () {
        localStorage.removeItem("jwtToken");
        Object.keys(localStorage)
          .filter(
            (item) =>
              item.includes("searchText") ||
              item.includes("filterList") ||
              item.includes("sortingOptions")
          )
          .forEach((item) => {
            localStorage.removeItem(`${item}`);
          });
        yield put(actions.LOG_OUT.SUCCESS());
      },
    (err) => actions.LOG_OUT.FAILED(err),
    callback && typeof callback === "function" && callback()
  );

export default function* () {
  yield takeLatest(types.SIGN_IN.REQUEST, signIn);
  yield takeLatest(types.FETCH_USER.REQUEST, getUser);
  yield takeLatest(types.LOG_OUT.REQUEST, logOut);
}
