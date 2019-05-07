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
  currentPage: 1,
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
    case GET_DEFAULT_POSTS_SUCCESS:
      return {
        ...state,
        currentPage: 3,
        loading: false,
        posts: action.data
      };
    case GET_POSTS_BY_PAGE:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS_BY_PAGE_SUCCESS:
      return {
        ...state,
        currentPage: state.currentPage + 1,
        posts: state.posts.concat(action.data),
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
