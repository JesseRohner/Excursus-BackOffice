import { types } from "./actions";

const initialState = {
  homeInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.GET_DEVICE.SUCCESS:
      return {
        ...state,
        homeInfo: action.payload,
      };
    default:
      return { ...state };
  }
};
