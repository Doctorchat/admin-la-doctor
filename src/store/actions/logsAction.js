import {
  CLEAN_ON_UNMOUNT_FALSE,
  CLEAN_ON_UNMOUNT_TRUE,
  LOGS_LIST_CLEAN,
  LOGS_LIST_GET,
} from "../actionTypes";
import api from "../../utils/appApi";

export const getLogsList =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await api.logs.get(params);

      dispatch({ type: LOGS_LIST_GET, payload: response.data });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const cleanLogsList = () => (dispatch) =>
  dispatch({
    type: LOGS_LIST_CLEAN,
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
