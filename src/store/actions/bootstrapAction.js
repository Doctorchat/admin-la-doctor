import { BOOTSTRAP_PUSH } from "../actionTypes";
import api from "../../utils/appApi";

export const setGlobalPrivateRequisites = () => (dispatch) =>
  Promise.allSettled([api.doctors.getSimplifiedList()])
    .then((settledPromises) => {
      const [doctors] = settledPromises;

      const payload = {
        doctors: doctors.value?.data || [],
      };

      dispatch({
        type: BOOTSTRAP_PUSH,
        payload,
      });

      return settledPromises;
    })
    .catch((err) => Promise.reject(err));
