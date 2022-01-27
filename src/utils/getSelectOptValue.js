const getSelectOptValue = (options = [], value) => {
  const option = options.find((opt) => opt.value === value);

  if (option) {
    return option.label;
  }

  return value;
};

export default getSelectOptValue;
