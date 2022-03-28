export default function fetcher(callback) {
  return async (args) => {
    const { queryKey } = args;

    try {
      const response = await callback(queryKey[1] || {});
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
