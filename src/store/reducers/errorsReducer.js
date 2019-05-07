import { GET_ERRORS } from "../actions/actionTypes";

const initialState = {
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default reducer;
