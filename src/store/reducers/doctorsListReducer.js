import {
  DOCTORS_LIST_CLEAN,
  CLEAN_ON_UNMOUNT_TRUE,
  CLEAN_ON_UNMOUNT_FALSE,
  DOCTORS_LIST_GET,
} from "../actionTypes";

const initialState = {
  payload: {},
  cleanOnUnmount: true,
};

const doctorsList = (state = initialState, action = {}) => {
  switch (action.type) {
    case DOCTORS_LIST_GET: {
      return { ...state, payload: action.payload };
    }
    case DOCTORS_LIST_CLEAN:
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

export default doctorsList;
