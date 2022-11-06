import axios from "axios";

const getApiErrorMessages = (err) =>
  (err.response &&
    err.response.data &&
    ((err.response.data.errors && Object.entries(err.response.data.errors)) ||
      err.response.data.message)) ||
  err.message ||
  "Eroare necunoscută";

export default getApiErrorMessages;

export const getApiErrorMessage = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response.data.error) return error.response.data.error;
    if (error.response.data.message) return error.response.data.message;
  }

  return error.message || "Eroare necunoscută";
};
