import {
  CLEAN_ON_UNMOUNT_FALSE,
  CLEAN_ON_UNMOUNT_TRUE,
  TRANSACTIONS_LIST_GET,
  TRANSACTIONS_LIST_CLEAN,
} from "../actionTypes";
import api from "../../utils/appApi";

export const getTransactionsList =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await api.stats.getTransactions(params);

      dispatch({ type: TRANSACTIONS_LIST_GET, payload: response.data });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const cleanTransactionsList = () => (dispatch) =>
  dispatch({
    type: TRANSACTIONS_LIST_CLEAN,
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
