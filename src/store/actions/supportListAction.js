import {
  CLEAN_ON_UNMOUNT_FALSE,
  CLEAN_ON_UNMOUNT_TRUE,
  SUPPORT_LIST_GET,
  UPDATE_COUNCIL_COUNT,
  UPDATE_SUPPORT_COUNT,
} from "../actionTypes";
import api from "../../utils/appApi";

export const getSupportList = (params) => async (dispatch) => {
  try {
    const response = await api.support.get(params);

    dispatch({ type: SUPPORT_LIST_GET, payload: response.data });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateSupportCount = () => async (dispatch) => {
  const response = await api.support.count();

  dispatch({
    type: UPDATE_SUPPORT_COUNT,
    payload: response.data,
  });

  return Promise.resolve();
};

export const updateCouncilCount = () => async (dispatch) => {
  const response = await api.council.count();

  dispatch({
    type: UPDATE_COUNCIL_COUNT,
    payload: response.data,
  });

  return Promise.resolve();
};

export const cleanSupportList = () => (dispatch) =>
  dispatch({
    type: SUPPORT_LIST_GET,
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
