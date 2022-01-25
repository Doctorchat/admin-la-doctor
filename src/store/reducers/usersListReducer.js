import {
  USERS_LIST_GET,
  USERS_LIST_CLEAN,
  CLEAN_ON_UNMOUNT_TRUE,
  CLEAN_ON_UNMOUNT_FALSE,
} from "../actionTypes";

const initialState = {
  payload: {},
  cleanOnUnmount: true,
};

const usersList = (state = initialState, action = {}) => {
  switch (action.type) {
    case USERS_LIST_GET: {
      return { ...state, payload: action.payload };
    }
    case USERS_LIST_CLEAN:
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

export default usersList;
