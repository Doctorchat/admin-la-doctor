import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMount } from "react-use";
import { DcTable } from "../../../components";
import { getChatStatus, getChatType } from "../../../modules/ChatsList";
import api from "../../../utils/appApi";
import date from "../../../utils/date";

export default function ChatsTab() {
  const { user_id } = useParams();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetcher = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.chats.last10(user_id);
      setChats(response.data);
    } finally {
      setLoading(false);
    }
  }, [user_id]);

  useMount(fetcher);

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        render: (rowData) => <Link to={`/chat/${rowData}`}>#{rowData}</Link>,
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        render: ({ id, name }) => <Link to={`/user/${id}`}>{name}</Link>,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (_, data) => getChatStatus(data),
      },
      {
        title: "Tipul",
        dataIndex: "type",
        render: (_, data) => getChatType(data),
      },
      {
        title: "Actualizat",
        dataIndex: "updated_at",
        render: (rowData) => date(rowData).full,
      },
    ],
    []
  );

  return (
    <DcTable
      dataColumns={columns}
      dataSource={chats}
      loading={loading}
      pagination={{
        position: ["none"],
      }}
    />
  );
}
