import {
  USERS_LIST_GET,
  USERS_LIST_CLEAN,
  CLEAN_ON_UNMOUNT_FALSE,
  CLEAN_ON_UNMOUNT_TRUE,
} from "../actionTypes";
import api from "../../utils/appApi";

export const getUsersList =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await api.users.get(params);

      dispatch({ type: USERS_LIST_GET, payload: response.data });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const cleanUsersList = () => (dispatch) =>
  dispatch({
    type: USERS_LIST_CLEAN,
  });

export const setCleanOnUnmountTrue = () => (dispatch) =>
  new Promise((resolve) => {
    dispatch({
      type: CLEAN_ON_UNMOUNT_TRUE,
    });
    return resolve();
  });

export const setCleanOnUnmountFalse = () => (dispatch) =>
  new Promise((resolve) => {
    dispatch({
      type: CLEAN_ON_UNMOUNT_FALSE,
    });
    return resolve();
  });
