import { Button, Divider, Form, Input, Tabs } from "antd";
import { useCallback } from "react";

const { TabPane } = Tabs;

export default function NotificationsTab() {
  const onChatNotificationsSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  const onEmailNotificationsSubmit = useCallback((values) => {
    console.log(values);
  }, []);

  return (
    <Tabs className="px-1">
      <TabPane key="chat-notifications" tab="Chat">
        <Form onFinish={onChatNotificationsSubmit}>
          <Divider orientation="left" className="mt-0">
            Achitare cu succes
          </Divider>
          <Form.Item label="RO" name={["paid", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["paid", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["paid", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>

          <Divider orientation="left">Mesaje neplătite</Divider>
          <Form.Item label="RO" name={["unpaid", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["unpaid", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["unpaid", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>

          <Divider orientation="left">Salutări</Divider>
          <Form.Item label="RO" name={["welcome", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["welcome", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["welcome", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>

          <Divider orientation="left">Rezervare meeting</Divider>
          <Form.Item label="RO" name={["reserved", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["reserved", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["reserved", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Salvează
            </Button>
          </div>
        </Form>
      </TabPane>

      <TabPane key="email-notifications-client" tab="Email client">
        <Form onFinish={onEmailNotificationsSubmit}>
          <Divider orientation="left" className="mt-0">
            Răspuns Primit (Titlu)
          </Divider>
          <Form.Item label="RO" name={["closed", "heading", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["closed", "heading", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["closed", "heading", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>

          <Divider orientation="left">Răspuns Primit (Content)</Divider>
          <Form.Item label="RO" name={["closed", "content", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["closed", "content", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["closed", "content", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>

          <Divider orientation="left">Răspuns Primit (Buton)</Divider>
          <Form.Item label="RO" name={["closed", "btn", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["closed", "btn", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["closed", "btn", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Salvează
            </Button>
          </div>
        </Form>
      </TabPane>

      <TabPane key="email-notifications-doctor" tab="Email doctor">
        <Form onFinish={onEmailNotificationsSubmit}>
          <Divider orientation="left" className="mt-0">
            Meeting Nou (Titlu)
          </Divider>
          <Form.Item label="RO" name={["closed", "heading", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["closed", "heading", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["closed", "heading", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Salvează
            </Button>
          </div>
        </Form>
      </TabPane>
    </Tabs>
  );
}
