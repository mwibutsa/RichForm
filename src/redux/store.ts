import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import baseReducer from "./reducers";

const store = createStore(
  baseReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
