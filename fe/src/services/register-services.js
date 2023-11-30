import { REGISTER_NEW_USER } from "../apiRoutes";
import axiosInstance from "../helpers/axios";

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
const registerNewUser = async (values) => {
  console.log("values in register services", values);

  return axiosInstance
    .post(REGISTER_NEW_USER, values)
    .then((res) => res)
    .catch((err) => err);
};

export default { registerNewUser };
