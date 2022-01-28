import {
  CLEAN_ON_UNMOUNT_TRUE,
  CLEAN_ON_UNMOUNT_FALSE,
  PROMOCODES_LIST_GET,
  PROMOCODES_LIST_CLEAN,
  CREATE_PROMOCODE,
  UPDATE_PROMOCODE,
  DELETE_RPMOCODE,
} from "../actionTypes";

const initialState = {
  payload: [],
  cleanOnUnmount: true,
};

const promocodesList = (state = initialState, action = {}) => {
  switch (action.type) {
    case PROMOCODES_LIST_GET: {
      return { ...state, payload: [...action.payload] };
    }
    case CREATE_PROMOCODE: {
      return { ...state, payload: [...state.payload, action.payload] };
    }
    case UPDATE_PROMOCODE: {
      return {
        ...state,
        payload: state.payload.map((code) =>
          code.id === action.payload.id ? action.payload : code
        ),
      };
    }
    case DELETE_RPMOCODE: {
      return {
        ...state,
        payload: state.payload.filter((code) => code.id !== action.payload),
      };
    }
    case PROMOCODES_LIST_CLEAN:
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

export default promocodesList;
