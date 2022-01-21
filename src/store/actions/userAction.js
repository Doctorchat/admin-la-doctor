import { LOGIN, LOGOUT, GET_USER, UPDATE_USER } from "../actionTypes";
import api from "../../utils/appApi";
import history from "../../utils/history";
import axiosInstance from "../../utils/apiConfig";

export const setUserToNotAuthorized = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAuthorized");
  axiosInstance.defaults.headers.Authorization = "Bearer ";
  dispatch({
    type: LOGOUT,
    payload: {},
  });
  history.push("/login");
};

export const setUserToAuthorized = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  localStorage.setItem("isAuthorized", "true");
  dispatch({
    type: LOGIN,
    payload: token ? { token } : {},
  });
};

export const login = (data) => (dispatch) =>
  api.user
    .login(data)
    .then((res) => {
      localStorage.setItem("isAuthorized", "true");
      localStorage.setItem("token", res.data.token);
      axiosInstance.defaults.headers.Authorization = `Bearer ${res.data.token}`;
      dispatch({
        type: LOGIN,
        payload: res.data,
      });

      return Promise.resolve(res);
    })
    .catch((err) => Promise.reject(err));

export const logout = () => (dispatch) =>
  api.user
    .logout()
    .then((res) => {
      setUserToNotAuthorized()(dispatch);
      return Promise.resolve(res);
    })
    .catch((err) => Promise.reject(err));

export const getUser = () => (dispatch) =>
  api.user
    .get()
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
      return Promise.resolve(res);
    })
    .catch((err) => Promise.reject(err));

export const updateUser = (userId, data) => (dispatch) =>
  api.user
    .update(userId, data)
    .then((res) => {
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
      return Promise.resolve(res);
    })
    .catch((err) => Promise.reject(err));

export const updateUserSettings = (data) => (dispatch) =>
  new Promise((resolve) => {
    dispatch({
      type: UPDATE_USER,
      payload: {
        settings: {
          admin_settings: data,
        },
      },
    });
    return resolve();
  });
