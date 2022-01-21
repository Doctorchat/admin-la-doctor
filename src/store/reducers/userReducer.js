import { LOGIN, LOGOUT, GET_USER } from "../actionTypes";

const initialState = {
  isAuthorized: false,
  token: "",
  payload: {},
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthorized: true,
        token: action.payload.token || "",
        payload: {
          ...state.payload,
          ...action.payload.user,
        },
      };
    case LOGOUT:
      return initialState;
    case GET_USER:
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state;
  }
};

export default user;
