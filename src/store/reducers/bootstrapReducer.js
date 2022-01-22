import { BOOTSTRAP_PUSH } from "../actionTypes";

const initialState = {
  loaded: false,
  payload: {},
};

const bootstrap = (state = initialState, action = {}) => {
  switch (action.type) {
    case BOOTSTRAP_PUSH:
      return {
        ...state,
        loaded: true,
        payload: { ...state.payload, ...action.payload },
      };
    default:
      return state;
  }
};

export default bootstrap;
