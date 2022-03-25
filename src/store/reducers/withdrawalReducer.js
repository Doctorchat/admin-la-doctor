import {
  UPDATE_WITHDRAWAL_COUNT,
  WITHDRAWAL_LIST_GET,
  CLEAN_ON_UNMOUNT_TRUE,
  CLEAN_ON_UNMOUNT_FALSE,
  WITHDRAWAL_LIST_CLEAN,
  WITHDRAWAL_APPROVE_SUCCESS,
} from "../actionTypes";

const initialState = {
  count: 0,
  payload: {},
  cleanOnUnmount: true,
};

const withdrawal = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_WITHDRAWAL_COUNT: {
      return { ...state, count: action.payload };
    }
    case WITHDRAWAL_LIST_GET: {
      return {
        ...state,
        payload: action.payload,
      };
    }
    case WITHDRAWAL_APPROVE_SUCCESS: {
      return {
        ...state,
        payload: {
          ...state.payload,
          data: state.payload.data.filter((w) => w.id !== action.payload),
        },
      };
    }
    case WITHDRAWAL_LIST_CLEAN:
      return { ...state, payload: {} };
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

export default withdrawal;
