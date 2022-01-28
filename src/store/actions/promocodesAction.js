import {
  CLEAN_ON_UNMOUNT_FALSE,
  CLEAN_ON_UNMOUNT_TRUE,
  CREATE_PROMOCODE,
  DELETE_RPMOCODE,
  PROMOCODES_LIST_CLEAN,
  PROMOCODES_LIST_GET,
  UPDATE_PROMOCODE,
} from "../actionTypes";
import api from "../../utils/appApi";

export const getPromocodesList =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await api.promocodes.get(params);

      dispatch({ type: PROMOCODES_LIST_GET, payload: response.data });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const createPromocode =
  ({ name, discount, status }) =>
  async (dispatch) => {
    try {
      const response = await api.promocodes.create({ name, discount, status });

      dispatch({ type: CREATE_PROMOCODE, payload: response.data });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const updatePromocode =
  ({ id, name, discount, status }) =>
  async (dispatch) => {
    try {
      const response = await api.promocodes.update({ id, name, discount, status });

      dispatch({ type: UPDATE_PROMOCODE, payload: response.data });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const deletePomocode =
  (id) =>
  async (dispatch) => {
    try {
      await api.promocodes.delete(id);

      dispatch({ type: DELETE_RPMOCODE, payload: id });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const cleanPromocodesList = () => (dispatch) =>
  dispatch({
    type: PROMOCODES_LIST_CLEAN,
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
