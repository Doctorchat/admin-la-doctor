import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { DcTable } from "../../../components";
import { chatStatuses, chatTypes } from "../../../modules/ChatsList";
import { getChatsList } from "../../../store/actions/chatsListAction";
import date from "../../../utils/date";
import { useDoctorViewContext } from "../DoctorViewContext";

export default function ChatsTab() {
  const { docInfo, updateDocInfo } = useDoctorViewContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetcher = useCallback(async () => {
    setLoading(true);

    try {
      await dispatch(
        getChatsList({ page: 1, sort_column: "id", sort_direction: "descend", limit: 10 })
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const columns = useMemo(
    () => [
      {
        title: "Client",
        dataIndex: "client",
        render: (rowData, { id }) => <Link to={`/user/${id}`}>{rowData}</Link>,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (rowData) => chatStatuses[rowData] || rowData,
      },
      {
        title: "Tipul",
        dataIndex: "type",
        render: (rowData) => chatTypes[rowData] || rowData,
      },
      {
        title: "Actualizat",
        dataIndex: "updated_at",
        render: (rowData) => date(rowData).dynamic(),
      },
    ],
    []
  );

  return (
    <DcTable
      dataColumns={columns}
      dataSource={messages}
      loading={loading}
      pagination={{
        position: ["none"],
      }}
    />
  );
}
