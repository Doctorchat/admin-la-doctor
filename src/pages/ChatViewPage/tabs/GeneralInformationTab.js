import { Descriptions } from "antd";
import { Link } from "react-router-dom";
import { getChatStatus, getChatType } from "../../../modules/ChatsList";
import date from "../../../utils/date";
import { useChatViewContext } from "../ChatViewContext";

export default function GeneralInformationTab() {
  const { chatInfo } = useChatViewContext();

  return (
    <Descriptions bordered size="small" layout="horizontal" column={1} labelStyle={{ width: 180 }}>
      <Descriptions.Item label="Client">
        <Link to={`/user/${chatInfo?.client?.id}`}>{chatInfo?.client?.name}</Link>
      </Descriptions.Item>
      <Descriptions.Item label="Doctor">
        <Link to={`/user/${chatInfo?.doctor?.id}`}>{chatInfo?.doctor?.name}</Link>
      </Descriptions.Item>
      <Descriptions.Item label="Status">
        {(chatInfo?.status && getChatStatus(chatInfo)) || "---"}
      </Descriptions.Item>
      <Descriptions.Item label="Tipul">
        {(chatInfo?.type && getChatType(chatInfo)) || "---"}
      </Descriptions.Item>
      <Descriptions.Item label="Actualizat">
        {(chatInfo.updated_at && date(chatInfo.updated_at).dynamic()) || "---"}
      </Descriptions.Item>
      <Descriptions.Item label="Suma">{chatInfo?.price} Lei</Descriptions.Item>
    </Descriptions>
  );
}
