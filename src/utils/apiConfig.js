import axios from "axios";
import store from "../store/store";
import { setUserToNotAuthorized } from "../store/actions/userAction";

const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "Bearer ",
  },
});

axiosInstance.CancelToken = axios.CancelToken;
axiosInstance.isCancel = axios.isCancel;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      response: { status },
    } = error;

    if (status === 401) {
      if (store.getState().user.isAuthorized) {
        store.dispatch(setUserToNotAuthorized());
        window.location.reload();
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
