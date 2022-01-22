import { TOGGLE_SPINNER_INDICATOR } from "../actionTypes";

const initialState = {
  active: false,
};

const spinnerIndicator = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_SPINNER_INDICATOR: {
      return { ...state, active: action.payload };
    }
    default:
      return state;
  }
};

export default spinnerIndicator;
