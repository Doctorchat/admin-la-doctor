import { Button, Divider, Select, Typography, Form } from "antd";
import { useChatViewContext } from "../ChatViewContext";

export default function SettingsStep() {
  const { chatInfo, updateChatInfo } = useChatViewContext();

  return (
    <>
      <Typography.Title level={5}>Schimă doctor-ul</Typography.Title>
      <Form layout="vertical">
        <Form.Item label="Doctor Asignat">
          <Select options={[]} placeholder="Selecteză doctor" />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Editează
        </Button>
      </Form>
      <Divider />
      <Typography.Title level={5}>Închide</Typography.Title>
      <Button type="primary" danger>
        Închide Conversația
      </Button>
    </>
  );
}
