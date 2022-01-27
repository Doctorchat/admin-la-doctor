import { BOOTSTRAP_PUSH } from "../actionTypes";
import api from "../../utils/appApi";

export const setGlobalPrivateRequisites = () => (dispatch) =>
  Promise.allSettled([api.bootstrap.simplifiedDoctors(), api.bootstrap.categories()])
    .then((settledPromises) => {
      const [doctors, categories] = settledPromises;

      const payload = {
        doctors: doctors.value?.data || [],
        categories: categories.value?.data || [],
      };

      dispatch({
        type: BOOTSTRAP_PUSH,
        payload,
      });

      return settledPromises;
    })
    .catch((err) => Promise.reject(err));
