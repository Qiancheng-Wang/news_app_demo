import {
  CHANGE_FONTSIZE,
  CHANGE_FONTSIZE_SUCCESS,
  GET_ERROR
} from "./actionTypes";

export const changeFontSize = fontSize => {
  return dispatch => {
    dispatch({ type: CHANGE_FONTSIZE });
    try {
      return dispatch(changeFontSizeSuccess(fontSize));
    } catch (e) {
      return dispatch(getErrors(e));
    }
  };
};

const changeFontSizeSuccess = fontSize => {
  return {
    type: CHANGE_FONTSIZE_SUCCESS,
    fontSize: fontSize
  };
};

const getErrors = e => {
  return {
    type: GET_ERROR,
    error: e
  };
};
