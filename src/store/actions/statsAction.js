import { STATS_CHARTS_GET } from "../actionTypes";
import api from "../../utils/appApi";

export const getStatsCharts = () => async (dispatch) => {
  try {
    const response = await api.stats.getCharts();

    dispatch({ type: STATS_CHARTS_GET, payload: response.data });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
