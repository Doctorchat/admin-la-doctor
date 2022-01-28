import { STATS_CHARTS_GET } from "../actionTypes";

const initialState = {
  charts: {},
  transactions: {
    payload: {},
    cleanOnUnmount: true,
  },
};

const stats = (state = initialState, action = {}) => {
  switch (action.type) {
    case STATS_CHARTS_GET:
      return {
        ...state,
        charts: action.payload,
      };
    default:
      return state;
  }
};

export default stats;
