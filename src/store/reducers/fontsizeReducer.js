import {
  CHANGE_FONTSIZE,
  CHANGE_FONTSIZE_SUCCESS
} from "../actions/actionTypes";

import { REHYDRATE } from "redux-persist";

const initialState = {
  fontSize: 14 //default
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...state,
        fontSize: parseInt(action.payload.fontsize.fontSize)
      };
    case CHANGE_FONTSIZE:
      return state;
    case CHANGE_FONTSIZE_SUCCESS:
      return {
        ...state,
        fontSize: action.fontSize
      };
    default:
      return state;
  }
};

export default reducer;
