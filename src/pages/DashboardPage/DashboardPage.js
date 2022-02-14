import { Button, Form, Input, Select, PageHeader, notification } from "antd";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { ChatsList, ReviewsList } from "../../modules/";
import api from "../../utils/appApi";
import getApiErrorMessages from "../../utils/getApiErrorMessages";

import "./styles/index.scss";

export default function DashboardPage() {
  const [form] = Form.useForm();
  const [formSubmitDisabled, setFormSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onFormChange = useCallback((_, fields) => {
    const formIsInvalid = fields.some((field) => !field.value);
    setFormSubmitDisabled(formIsInvalid);
  }, []);

  const sendGlobalMsgHandler = useCallback(
    async (values) => {
      setLoading(true);

      try {
        await api.support.sendGlobalMsg(values);
        form.resetFields();
        setFormSubmitDisabled(true);
      } catch (error) {
        notification.error({ message: "Error", description: getApiErrorMessages(error) });
      } finally {
        setLoading(false);
      }
    },
    [form]
  );

  return (
    <>
      <PageHeader className="site-page-header" title="Dashboard" />
      <div className="global-message-form">
        <h3 className="global-message-title">Mesaj Global</h3>
        <Form
          layout="vertical"
          onFinish={sendGlobalMsgHandler}
          form={form}
          onFieldsChange={onFormChange}
        >
          <Form.Item
            name="content"
            rules={[{ required: true, message: "Acest câmp este obligatoriu" }]}
          >
            <Input.TextArea autoSize={{ maxRows: 8 }} placeholder="Mesajul..." />
          </Form.Item>
          <Form.Item
            name="group"
            rules={[{ required: true, message: "Acest câmp este obligatoriu" }]}
          >
            <Select
              placeholder="Selectează grupa"
              options={[
                { value: 1, label: "Clienți" },
                { value: 2, label: "Doctori" },
                { value: 3, label: "Global" },
              ]}
            />
          </Form.Item>
          <Button
            type="primary"
            onClick={form.submit}
            disabled={formSubmitDisabled}
            loading={loading}
          >
            Trimite
          </Button>
        </Form>
      </div>
      <div className="my-5" />
      <ChatsList
        title="Mesaje Recente"
        simplified
        extra={
          <div className="w-100 d-flex justify-content-end">
            <Link to="/chats">
              <Button type="link" className="py-0">
                Vezi toata lista
              </Button>
            </Link>
          </div>
        }
      />
      <div className="my-5" />
      <ReviewsList
        title="Testemoniale Recente"
        simplified
        extra={
          <div className="w-100 d-flex justify-content-end">
            <Link to="/reviews">
              <Button type="link" className="py-0">
                Vezi toata lista
              </Button>
            </Link>
          </div>
        }
      />
    </>
  );
}
