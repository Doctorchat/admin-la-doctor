import api from "../../utils/appApi";
import { UPDATE_REQUESTS_COUNT } from "../actionTypes";

export const updateRequestsCount = () => async (dispatch) => {
  const response = await api.doctors.requestsCount();

  dispatch({
    type: UPDATE_REQUESTS_COUNT,
    payload: response.data,
  });

  return Promise.resolve();
};
