import {
  CHANGE_FONTSIZE,
  CHANGE_FONTSIZE_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  fontSize: 30 //default
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
