const getApiErrorMessages = (err) =>
  (err.response &&
    err.response.data &&
    ((err.response.data.errors && Object.entries(err.response.data.errors)) ||
      err.response.data.message)) ||
  err.message ||
  'Unknown error';

export default getApiErrorMessages;
