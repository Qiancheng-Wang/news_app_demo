import {
  GET_DEFAULT_POSTS,
  GET_DEFAULT_POSTS_SUCCESS,
  GET_POSTS_BY_PAGE,
  GET_POSTS_BY_PAGE_SUCCESS,
  SELECT_SINGLE_POST,
  SELECT_SINGLE_POST_SUCCESS,
  GET_ERROR
} from "./actionTypes";

import {
  defaultApi,
  getPostByPageAPI,
  getPostByIdAPI
} from "../../../src/api/api";

export const getDefaultPosts = () => {
  return async dispatch => {
    dispatch({ type: GET_DEFAULT_POSTS });
    try {
      const data = await defaultApi();
      return dispatch(getDefaultPostsSuccess(data));
    } catch (e) {
      return dispatch(getErrors(e));
    }
  };
};

const getDefaultPostsSuccess = data => {
  return {
    type: GET_DEFAULT_POSTS_SUCCESS,
    data: data.data
  };
};

const getErrors = e => {
  return {
    type: GET_ERROR,
    error: e
  };
};

export const getPostsByPage = (pageNum, postsPerPage) => {
  return async dispatch => {
    dispatch({ type: GET_POSTS_BY_PAGE });
    try {
      const data = await getPostByPageAPI(pageNum, postsPerPage);
      return dispatch(getPostsByPageSuccess(data));
    } catch (e) {
      return dispatch(getErrors(e));
    }
  };
};

const getPostsByPageSuccess = data => {
  return {
    type: GET_POSTS_BY_PAGE_SUCCESS,
    data: data.data
  };
};

export const selectPostById = postId => {
  return async dispatch => {
    dispatch({ type: SELECT_SINGLE_POST });
    try {
      const data = await getPostByIdAPI(postId);
      return dispatch(selectPostByIdSuccess(data));
    } catch (e) {
      return dispatch(getErrors(e));
    }
  };
};

const selectPostByIdSuccess = data => {
  return {
    type: SELECT_SINGLE_POST_SUCCESS,
    data: data.data
  };
};
