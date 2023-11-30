import axiosInstance from "../helpers/axios";
import { LOGIN_USER, LOGOUT_USER } from "../apiRoutes";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
const loginUser = async (values) => {
  const loggedInUserObj = {
    email: values.email,
    password: values.password,
  };

  return axiosInstance
    .post(LOGIN_USER, { loggedInUserObj })
    .then((res) => {
      window.localStorage.setItem("userToken", res.data.token);
      return res;
    })
    .catch((err) => err);
};

const logout = async (values) => {
  return axiosInstance
    .post(LOGOUT_USER)
    .then((res) => res)
    .catch((err) => err);
};

export default { loginUser, logout };
