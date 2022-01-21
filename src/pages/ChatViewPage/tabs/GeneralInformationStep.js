import { Descriptions, Tag } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import date from "../../../utils/date";
import { useChatViewContext } from "../ChatViewContext";

export default function GeneralInformationStep() {
  const { chatInfo, updateChatInfo } = useChatViewContext();

  return (
    <Descriptions bordered size="small" layout="horizontal" column={1} labelStyle={{ width: 180 }}>
      <Descriptions.Item label="Client">
        <Link to="/">Novac Denis</Link>
      </Descriptions.Item>
      <Descriptions.Item label="Doctor">
        <Link to="/">John Doe</Link>
      </Descriptions.Item>
      <Descriptions.Item label="Status">
        <Tag color="orange">În așteptare</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Tipul">Standard</Descriptions.Item>
      <Descriptions.Item label="Actualizat">{date(moment()).dynamic()}</Descriptions.Item>
      <Descriptions.Item label="Suma">230 Lei</Descriptions.Item>
    </Descriptions>
  );
}
