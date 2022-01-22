export const selectDoctorsOptions = (store) =>
  store.bootstrap.payload.doctors?.map((itm) => ({
    value: itm.id,
    label: itm.name,
  }));
