import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, Alert } from "antd";
import { login } from "../../store/actions/userAction";
import useApiErrorsWithAntd from "../../hooks/useApiErrorsWithAntd";

import "./loginPage.sass";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { setApiErrorsToAntdForm } = useApiErrorsWithAntd(form);
  const globalErrors = form.getFieldError("global");

  const onSubmit = useCallback(
    (values) => {
      setLoading(true);
      login(values)(dispatch).catch((err) => {
        setLoading(false);
        setApiErrorsToAntdForm(err);
      });
    },
    [dispatch, setApiErrorsToAntdForm]
  );

  return (
    <div className="login-page px-3">
      <Form form={form} onFinish={onSubmit} className="login-page-form mx-auto">
        <div className="text-center mb-3">
          <h2>
            <b>Doctorchat</b>
          </h2>
        </div>
        <Form.Item name="email" rules={[{ required: true }, { type: "email" }]}>
          <Input size="large" prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Parola" />
        </Form.Item>
        <Form.Item hidden name="global">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button size="large" type="primary" htmlType="submit" className="w-100" loading={loading}>
            Autentificare
          </Button>
        </Form.Item>
        {!!globalErrors.length && (
          <Alert message="Error" description={globalErrors} type="error" showIcon />
        )}
      </Form>
    </div>
  );
};

export default LoginPage;
