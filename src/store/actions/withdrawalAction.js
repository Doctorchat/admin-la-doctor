import {
  CLEAN_ON_UNMOUNT_FALSE,
  CLEAN_ON_UNMOUNT_TRUE,
  UPDATE_WITHDRAWAL_COUNT,
  WITHDRAWAL_LIST_GET,
  WITHDRAWAL_LIST_CLEAN,
  WITHDRAWAL_APPROVE_SUCCESS,
} from "../actionTypes";
import api from "../../utils/appApi";

export const updateWithdrawalCount = () => async (dispatch) => {
  const response = await api.withdrawal.count();

  dispatch({
    type: UPDATE_WITHDRAWAL_COUNT,
    payload: response.data,
  });

  return Promise.resolve();
};

export const getWithdrawalList =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await api.withdrawal.get(params);

      dispatch({ type: WITHDRAWAL_LIST_GET, payload: response.data });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const onWithdrawalApproveSuccess = (id) => (dispatch) => {
  dispatch({
    type: WITHDRAWAL_APPROVE_SUCCESS,
    payload: id,
  });
};

export const cleanWithdrawalList = () => (dispatch) =>
  dispatch({
    type: WITHDRAWAL_LIST_CLEAN,
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
