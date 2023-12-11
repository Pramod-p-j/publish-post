import axiosInstance from "../helpers/axios";
import { LOGIN_USER, LOGOUT_USER, GOOGLE_LOGIN } from "../apiRoutes";
import axios from "axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
const loginUser = async (values) => {
  const loggedInUserObj = {
    email: values.email,
    password: values.password,
  };

  return axiosInstance
    .post(LOGIN_USER, { loggedInUserObj })
    .then((res) => {
      if (res.status === 200) {
        window.localStorage.setItem("userToken", res.data.token);
        window.localStorage.setItem("_user", JSON.stringify(res.data.user));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
      }
      return res;
    })
    .catch((err) => err);
};

const googleLoginUser = async (values) => {
  const googleUserObj = {
    email: values.email,
    verified: values.email_verified,
  };

  return axiosInstance
    .post(GOOGLE_LOGIN, { googleUserObj })
    .then((res) => {
      if (res.status === 200) {
        window.localStorage.setItem("userToken", res.data.token);
        window.localStorage.setItem("_user", JSON.stringify(res.data.user));
      }
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

export default { loginUser, logout, googleLoginUser };
