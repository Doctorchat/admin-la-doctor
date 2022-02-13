import { Button, Divider, Form, Input, Tabs } from "antd";
import { useGlobalSettingsContext } from "../GlobalSettingsContext";

const { TabPane } = Tabs;

export default function NotificationsTab() {
  const { notifications, onSubmit } = useGlobalSettingsContext();

  if (!notifications && !Object.keys(notifications).length) return null;

  return (
    <Form onFinish={onSubmit({ id: 2 })} initialValues={{ ...notifications }}>
      <Tabs className="px-1">
        <TabPane key="chat-notifications" tab="Chat">
          <Divider orientation="left" className="mt-0">
            Achitare cu succes
          </Divider>
          <Form.Item label="RO" name={["chat", "paid", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["chat", "paid", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["chat", "paid", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>

          {/* <Divider orientation="left">Mesaje neplătite</Divider>
          <Form.Item label="RO" name={["unpaid", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["unpaid", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["unpaid", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item> */}

          <Divider orientation="left">Salutări</Divider>
          <Form.Item label="RO" name={["chat", "welcome", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["chat", "welcome", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["chat", "welcome", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>

          {/* <Divider orientation="left">Rezervare meeting</Divider>
          <Form.Item label="RO" name={["reserved", "ro"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="RU" name={["reserved", "ru"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="EN" name={["reserved", "en"]} rules={[{ required: true }]}>
            <Input.TextArea autoSize />
          </Form.Item> */}
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Salvează
            </Button>
          </div>
        </TabPane>

        <TabPane key="email-notifications-client" tab="Email client">
          <Divider orientation="left" className="mt-0">
            Răspuns Primit (Titlu)
          </Divider>
          <Form.Item
            label="RO"
            name={["email", "user", "closed", "heading", "ro"]}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item
            label="RU"
            name={["email", "user", "closed", "heading", "ru"]}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item
            label="EN"
            name={["email", "user", "closed", "heading", "en"]}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>

          <Divider orientation="left">Răspuns Primit (Content)</Divider>
          <Form.Item
            label="RO"
            name={["email", "user", "closed", "content", "ro"]}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item
            label="RU"
            name={["email", "user", "closed", "content", "ru"]}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item
            label="EN"
            name={["email", "user", "closed", "content", "en"]}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>

          <Divider orientation="left">Răspuns Primit (Buton)</Divider>
          <Form.Item
            label="RO"
            name={["email", "user", "closed", "btn", "ro"]}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item
            label="RU"
            name={["email", "user", "closed", "btn", "ru"]}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item
            label="EN"
            name={["email", "user", "closed", "btn", "en"]}
            rules={[{ required: true }]}
          >
            <Input.TextArea autoSize />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Salvează
            </Button>
          </div>
        </TabPane>

        <TabPane key="email-notifications-doctor" tab="Email doctor">
          <div data-dev-name="NEW-MEETING">
            <Divider orientation="left" className="mt-0">
              Meeting Nou (Titlu)
            </Divider>
            <Form.Item
              label="RO"
              name={["email", "doctor", "new-meet", "heading", "ro"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="RU"
              name={["email", "doctor", "new-meet", "heading", "ru"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="EN"
              name={["email", "doctor", "new-meet", "heading", "en"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>

            <Divider orientation="left" className="mt-0">
              Meeting Nou (Content)
            </Divider>
            <Form.Item
              label="RO"
              name={["email", "doctor", "new-meet", "content", "ro"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="RU"
              name={["email", "doctor", "new-meet", "content", "ru"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="EN"
              name={["email", "doctor", "new-meet", "content", "en"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>

            <Divider orientation="left" className="mt-0">
              Meeting Nou (Buton)
            </Divider>
            <Form.Item
              label="RO"
              name={["email", "doctor", "new-meet", "btn", "ro"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="RU"
              name={["email", "doctor", "new-meet", "btn", "ru"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="EN"
              name={["email", "doctor", "new-meet", "btn", "en"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
          </div>

          <div data-dev-name="NEW-TICKET">
            <Divider orientation="left" className="mt-0">
              Mesaj Nou (Titlu)
            </Divider>
            <Form.Item
              label="RO"
              name={["email", "doctor", "new-ticket", "heading", "ro"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="RU"
              name={["email", "doctor", "new-ticket", "heading", "ru"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="EN"
              name={["email", "doctor", "new-ticket", "heading", "en"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>

            <Divider orientation="left" className="mt-0">
              Mesaj Nou (Content)
            </Divider>
            <Form.Item
              label="RO"
              name={["email", "doctor", "new-ticket", "content", "ro"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="RU"
              name={["email", "doctor", "new-ticket", "content", "ru"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="EN"
              name={["email", "doctor", "new-ticket", "content", "en"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>

            <Divider orientation="left" className="mt-0">
              Mesaj Nou (Buton)
            </Divider>
            <Form.Item
              label="RO"
              name={["email", "doctor", "new-ticket", "btn", "ro"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="RU"
              name={["email", "doctor", "new-ticket", "btn", "ru"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="EN"
              name={["email", "doctor", "new-ticket", "btn", "en"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
          </div>

          <div data-dev-name="REQUEST RECEIVED">
            <Divider orientation="left" className="mt-0">
              Am primit cererea depusă... (Content)
            </Divider>
            <Form.Item
              label="RO"
              name={["email", "doctor", "recived", "content", "ro"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="RU"
              name={["email", "doctor", "recived", "content", "ru"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="EN"
              name={["email", "doctor", "recived", "content", "en"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
          </div>

          <div data-dev-name="REQUEST APPROVED">
            <Divider orientation="left" className="mt-0">
              Felicitări, cererea depusă... (Titlu)
            </Divider>
            <Form.Item
              label="RO"
              name={["email", "doctor", "aproved", "heading", "ro"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="RU"
              name={["email", "doctor", "aproved", "heading", "ru"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="EN"
              name={["email", "doctor", "aproved", "heading", "en"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>

            <Divider orientation="left" className="mt-0">
              Felicitări, cererea depusă... (Content)
            </Divider>
            <Form.Item
              label="RO"
              name={["email", "doctor", "aproved", "content", "ro"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="RU"
              name={["email", "doctor", "aproved", "content", "ru"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="EN"
              name={["email", "doctor", "aproved", "content", "en"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>

            <Divider orientation="left" className="mt-0">
              Felicitări, cererea depusă... (Buton)
            </Divider>
            <Form.Item
              label="RO"
              name={["email", "doctor", "aproved", "btn", "ro"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="RU"
              name={["email", "doctor", "aproved", "btn", "ru"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
            <Form.Item
              label="EN"
              name={["email", "doctor", "aproved", "btn", "en"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize />
            </Form.Item>
          </div>

          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Salvează
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </Form>
  );
}
