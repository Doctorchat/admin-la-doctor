import { Alert, Button, Drawer, Form, Input } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

import api from "../utils/appApi";
import useApiErrorsWithAntd from "../hooks/useApiErrorsWithAntd";

export default function CompanyForm({ open, onClose, defaultValues, onSubmitSuccess }) {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setApiErrorsToAntdForm } = useApiErrorsWithAntd(form);

  const onFinish = async (values) => {
    try {
      setIsSubmitting(true);

      if (defaultValues.id) await api.companies.update(defaultValues.id, values);
      else await api.companies.create(values);

      await onSubmitSuccess();

      onClose();
    } catch (error) {
      setApiErrorsToAntdForm(error);
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer title="Detalii companie" placement="right" onClose={onClose} open={open}>
      <Form layout="vertical" form={form} initialValues={defaultValues} onFinish={onFinish}>
        <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.global !== currentValues.global}>
          {({ getFieldError }) =>
            getFieldError("global").length > 0 && (
              <>
                <Alert message={getFieldError("global")} type="error" />
                <div className="mt-4" />
              </>
            )
          }
        </Form.Item>

        <Form.Item label="Nume" name="name" rules={[{ required: true }]}>
          <Input placeholder="MAIB" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }, { type: "email", message: "Acest email nu este valid" }]}
        >
          <Input placeholder="maib@example.com" />
        </Form.Item>
        <Form.Item
          label={defaultValues.id ? "Parola nouă" : "Parola"}
          name="password"
          rules={[{ required: Boolean(defaultValues.id) === false }]}
        >
          <Input type="password" placeholder="********" />
        </Form.Item>
        <Form.Item
          label={defaultValues.id ? "Confirmă parola nouă" : "Confirmă parola"}
          name="password_confirmation"
          rules={[
            { required: Boolean(defaultValues.id) === false },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Parolele nu coincid"));
              },
            }),
          ]}
        >
          <Input type="password" placeholder="********" />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Salveaza
          </Button>
        </div>
      </Form>
    </Drawer>
  );
}

CompanyForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  onSubmitSuccess: PropTypes.func,
};
