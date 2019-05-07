import {
  GET_DEFAULT_POSTS,
  GET_DEFAULT_POSTS_SUCCESS,
  GET_POSTS_BY_PAGE,
  GET_POSTS_BY_PAGE_SUCCESS,
  SELECT_SINGLE_POST,
  GET_ERROR,
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  posts: null,
  selectedPost: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DEFAULT_POSTS:
      return {
        ...state,
        loading: true
      };
    case GET_DEFAULT_POSTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        posts: action.data
      };
    }
    default:
      return state;
  }
};

export default reducer;
