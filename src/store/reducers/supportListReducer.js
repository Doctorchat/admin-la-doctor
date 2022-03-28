import {
  CLEAN_ON_UNMOUNT_TRUE,
  CLEAN_ON_UNMOUNT_FALSE,
  CHATS_LIST_CLEAN,
  UPDATE_SUPPORT_COUNT,
  SUPPORT_LIST_GET,
  UPDATE_COUNCIL_COUNT,
} from "../actionTypes";

const initialState = {
  payload: {},
  count: 0,
  councilCount: 0,
  cleanOnUnmount: true,
};

const supportList = (state = initialState, action = {}) => {
  switch (action.type) {
    case SUPPORT_LIST_GET:
      return { ...state, payload: action.payload };
    case UPDATE_SUPPORT_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case UPDATE_COUNCIL_COUNT:
      return {
        ...state,
        councilCount: action.payload,
      };
    case CHATS_LIST_CLEAN:
      return initialState;
    case CLEAN_ON_UNMOUNT_TRUE:
      return {
        ...state,
        cleanOnUnmount: true,
      };
    case CLEAN_ON_UNMOUNT_FALSE:
      return {
        ...state,
        cleanOnUnmount: false,
      };
    default:
      return state;
  }
};

export default supportList;
