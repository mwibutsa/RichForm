import {
  SAVE_DATA_FAILURE,
  SAVE_DATA_START,
  SAVE_DATA_SUCCESS,
} from "../actionTypes";
import { Action, InitialState } from "../../types/index.d";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const richFormReducer = (
  state = initialState,
  { type, payload }: Action
): InitialState => {
  switch (type) {
    case SAVE_DATA_START:
      return {
        ...state,
        data: state.data,
        loading: true,
        error: null,
      };

    case SAVE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case SAVE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};

export default richFormReducer;
