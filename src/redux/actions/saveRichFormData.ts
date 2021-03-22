import { Dispatch } from "redux";

import {
  SAVE_DATA_FAILURE,
  SAVE_DATA_START,
  SAVE_DATA_SUCCESS,
} from "../actionTypes";
import { FormData } from "../../types/index.d";
import axios from "../../customAxios";

const saveDataStart = () => ({
  type: SAVE_DATA_START,
});

const saveDataSuccess = (data: FormData) => ({
  type: SAVE_DATA_SUCCESS,
  payload: { data },
});

const saveDataFailure = (error: unknown) => ({
  type: SAVE_DATA_FAILURE,
  payload: { error },
});

export const saveFormData = (formData: FormData) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    dispatch(saveDataStart());
    const { data } = await axios.post("/data.json", formData);
    dispatch(saveDataSuccess(data));
  } catch (error) {
    dispatch(saveDataFailure(error));
  }
};
