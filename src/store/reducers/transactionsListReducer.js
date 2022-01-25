import {
  CLEAN_ON_UNMOUNT_TRUE,
  CLEAN_ON_UNMOUNT_FALSE,
  TRANSACTIONS_LIST_GET,
  TRANSACTIONS_LIST_CLEAN,
} from "../actionTypes";

const initialState = {
  payload: {},
  cleanOnUnmount: true,
};

const transactionsList = (state = initialState, action = {}) => {
  switch (action.type) {
    case TRANSACTIONS_LIST_GET: {
      return { ...state, payload: action.payload };
    }
    case TRANSACTIONS_LIST_CLEAN:
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

export default transactionsList;
