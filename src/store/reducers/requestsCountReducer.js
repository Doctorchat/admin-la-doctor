import { UPDATE_REQUESTS_COUNT } from "../actionTypes";

const initialState = {
  count: 0,
};

const requestsCount = (state = initialState, action = {}) => {
  switch (action.type) {
    case UPDATE_REQUESTS_COUNT: {
      return { count: action.payload };
    }
    default:
      return state;
  }
};

export default requestsCount;
