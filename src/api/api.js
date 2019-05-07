import axios from "axios";

export const defaultApi = async () => {
  console.log("calling defaultAPi");
  const data = await axios.get(
    `https://staging.allfin.com/wordpress/wp-json/wp/v2/posts?page=1&per_page=10`
  );

  return data;
};

export const getPostByPage = async (pageNum, postPerPage) => {
  console.log("calling getPostByPage");
  const data = await axios.get(
    `https://staging.allfin.com/wordpress/wp-json/wp/v2/posts?page=${pageNum}&per_page=${postPerPage}`
  );
  return data;
};

export const getPostById = async postId => {
  console.log("calling getPostById");
  const data = await axios.get(
    `https://staging.allfin.com/wordpress/wp-json/wp/v2/posts/${postId}`
  );
  return data;
};
