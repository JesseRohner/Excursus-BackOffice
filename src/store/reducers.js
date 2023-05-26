import { combineReducers } from "redux";

import { authReducer } from "../Containers/Auth/store";
import { customersReducer } from "../Containers/Customers/store";
import { dashboardReducer } from "../Containers/Dashboard/store";
import { detectivesReducer } from "../Containers/Detectives/store";
import { practicesReducer } from "../Containers/Practices/store";
import { statusesReducer } from "../Containers/TypesAndStatuses/store";
import { errorReducer } from "../shared/Error/store/reducer";
import { LoaderReducer } from "../shared/Loader/store/reducer";

export default () =>
  combineReducers({
    loader: LoaderReducer,
    errorReducer,
    authReducer,
    dashboardReducer,
    customersReducer,
    practicesReducer,
    statusesReducer,
    detectivesReducer,
  });
