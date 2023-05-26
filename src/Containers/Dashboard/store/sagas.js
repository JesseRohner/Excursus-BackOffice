import { call, put, takeLatest } from "redux-saga/effects";

import { Api } from "../../../entries/ApiTransport";
import sagaAssessor from "../../../utils/sagaAssessor";
import { actions, types } from "./actions";

const api = Api.getInstance();

const getDeviceInfo = ({ callback }) =>
  sagaAssessor(
    () =>
      function* () {
        const { data } = yield call(() => api.get("getAllMachine"));
        yield put(actions.GET_DEVICE.SUCCESS(data));
      },
    (err) => actions.GET_HOME.FAILED(err),
    callback && typeof callback === "function" && callback()
  );

export default function* () {
  yield takeLatest(types.GET_DEVICE.REQUEST, getDeviceInfo);
}
