import {
  GET_DEFAULT_POSTS,
  GET_DEFAULT_POSTS_SUCCESS,
  GET_POSTS_BY_PAGE,
  GET_POSTS_BY_PAGE_SUCCESS,
  SELECT_SINGLE_POST,
  GET_ERROR,
  LOAD_POSTS,
  LOAD_POSTS_SUCCESS,
  GET_ERRORS
} from "./actionTypes";

import { defaultApi, getPostByPage, getPostById } from "../../../src/api/api";

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
    type: GET_ERRORS,
    error: e
  };
};
