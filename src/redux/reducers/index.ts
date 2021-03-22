import { combineReducers } from "redux";
import richFormReducer from "./richForm";

const baseReducer = combineReducers({
  data: richFormReducer,
});

export default baseReducer;
