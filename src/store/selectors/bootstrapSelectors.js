export const selectDoctorsOptions = (store) =>
  store.bootstrap.payload.doctors?.map((itm) => ({
    value: itm.id,
    label: itm.name,
  }));

export const selectCategoriesOptions = (store) =>
  store.bootstrap.payload.categories?.map((cat) => ({
    value: cat.id,
    label: cat.name_ro,
  }));
