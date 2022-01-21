import {
  CHATS_LIST_CLEAN,
  CHATS_LIST_GET,
  CLEAN_ON_UNMOUNT_FALSE,
  CLEAN_ON_UNMOUNT_TRUE,
} from "../actionTypes";
import api from "../../utils/appApi";

export const getChatsList =
  (params = {}) =>
  async (dispatch) => {
    try {
      const response = await api.chats.get(params);

      dispatch({ type: CHATS_LIST_GET, payload: response.data });

      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const cleanChatsList = () => (dispatch) =>
  dispatch({
    type: CHATS_LIST_CLEAN,
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
