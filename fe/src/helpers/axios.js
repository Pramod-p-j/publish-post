import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

const headers = {
  "Access-Control-Allow-Headers": "Content-Type, Authorization ,x-encrypted",
  "Content-Type": "application/json",
  "x-encrypted": false,
};

const axiosInstance = axios.create({
  baseURL,
  headers,
});

axiosInstance.interceptors.request.use(
  (config) => {
    /* const user = JSON.parse(localStorage.getItem('_user'));
        const token = user ? user.token : null;
        // const token = AuthService.getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } */
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,

  async (err) => {
    // console.log('Im interceptors error IN AXIOS: ', err.response, err.response.data);
    /* if (err.response?.status === 401 && err.response?.data && err.response?.data?.data === 'INVALID_TOKEN') {
            store.dispatch(
                openSessionPopup({
                    open: true
                })
            );
        } */
    return Promise.reject(err);
  }
);
export default axiosInstance;
