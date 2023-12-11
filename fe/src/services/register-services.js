import { GOOGLE_SIGN_UP, REGISTER_NEW_USER } from "../apiRoutes";
import axiosInstance from "../helpers/axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
const registerNewUser = async (values) => {
  return axiosInstance
    .post(REGISTER_NEW_USER, values)
    .then((res) => res)
    .catch((err) => err);
};

const googleSignUpUser = async (values) => {
  console.log("values ==>>>", values);
  const googleUserObj = {
    email: values.email,
    verified: values.email_verified,
    fullName: values.name,
  };

  return axiosInstance
    .post(GOOGLE_SIGN_UP, { googleUserObj })
    .then((res) => res)
    .catch((err) => err);
};

export default { registerNewUser, googleSignUpUser };
