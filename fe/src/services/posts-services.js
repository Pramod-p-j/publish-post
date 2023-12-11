import { CREATE_POST, FETCH_POSTS } from "../apiRoutes";
import axiosInstance from "../helpers/axios";

const createPost = async (values) => {
  return axiosInstance
    .post(CREATE_POST, values)
    .then((res) => res)
    .catch((err) => err);
};

const fetchPosts = async (val) => {
  return axiosInstance
    .post(FETCH_POSTS, val)
    .then((res) => res)
    .catch((err) => err);
};

export default { createPost, fetchPosts };
