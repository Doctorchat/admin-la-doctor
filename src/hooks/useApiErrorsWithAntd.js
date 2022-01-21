import { useCallback } from 'react';
import getApiErrorMessages from '../utils/getApiErrorMessages';

/**
 * Set api errors to form fields via antd
 * @param form from antd Form (Form.useForm)
 * @returns {{setApiErrorsToAntdForm: function }}
 */
const useApiErrorsWithAntd = (form) => {
  const setApiErrorsToAntdForm = useCallback(
    (err, config = {}) => {
      const { customName } = config;
      const errors = getApiErrorMessages(err);
      if (Array.isArray(errors)) {
        form.setFields(
          errors.map(([name, msgs]) => {
            const finalName = customName ? customName(name) : name;
            return { name: finalName, errors: msgs };
          }),
        );
      } else {
        form.setFields([{ name: 'global', errors: [errors] }]);
      }
    },
    [form],
  );

  return { setApiErrorsToAntdForm };
};

export default useApiErrorsWithAntd;
