import { CREATE_POST, FETCH_POSTS } from "../apiRoutes";
import axiosInstance from "../helpers/axios";

const createPost = async (values) => {
  console.log("post service log called", values);

  return axiosInstance
    .post(CREATE_POST, values)
    .then((res) => res)
    .catch((err) => err);
};

const fetchPosts = async () => {
  return axiosInstance
    .get(FETCH_POSTS)
    .then((res) => res)
    .catch((err) => err);
};

export default { createPost, fetchPosts };
