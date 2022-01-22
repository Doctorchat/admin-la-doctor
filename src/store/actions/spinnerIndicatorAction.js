import { TOGGLE_SPINNER_INDICATOR } from "../actionTypes";

export const toggleSpinnerIndicator = (status) => (dispatch) => {
  dispatch({
    type: TOGGLE_SPINNER_INDICATOR,
    payload: status,
  });

  return Promise.resolve();
};
