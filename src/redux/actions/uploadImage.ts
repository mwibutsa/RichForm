import { Dispatch } from "redux";
import { storage } from "../../firebase";
import {
  UPLOAD_IMAGE_START,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE,
} from "../actionTypes";

const uploadImageStart = () => ({
  type: UPLOAD_IMAGE_START,
});

const uploadImageSuccess = (data: unknown) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: { data },
});

const uploadImageFailure = (error: unknown) => ({
  type: UPLOAD_IMAGE_FAILURE,
  payload: {
    error,
  },
});

export const uploadImage = (imageData: ArrayBuffer) => async (
  dispatch: Dispatch
): Promise<void> => {
  try {
    dispatch(uploadImageStart());
  } catch (error) {}
};
