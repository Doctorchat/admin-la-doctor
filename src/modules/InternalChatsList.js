import { Alert, Tag, Button, PageHeader, Typography } from "antd";
import { useCallback, useMemo } from "react";
import { useSessionStorage } from "react-use";
import { DcTable } from "../components";
import { useQuery } from "react-query";
import date from "../utils/date";
import api from "../utils/appApi";
import fetcher from "../utils/fetcher";
import { Link } from "react-router-dom";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

export const transactionsStatuses = {
  confirmed: <Tag color="green">Confirmat</Tag>,
  initied: <Tag>Inițializat</Tag>,
};

const tableStateKey = "council-list-state";

export default function InternalChatsList() {
  const [state, setState] = useSessionStorage(tableStateKey, initialState);

  const {
    data: internalChats,
    isLoading,
    error,
  } = useQuery([tableStateKey, state], fetcher(api.internal.get));

  const onTableChange = useCallback(
    (pagination) => {
      const newState = { ...state };

      newState.page = pagination.current;

      setState(newState);
    },
    [setState, state]
  );

  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id" },
      {
        title: "Doctor Ascuns",
        dataIndex: "hidden",
        render: ({ id, name }) => <Link to={`/doctor/${id}`}>{name}</Link>,
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        render: ({ id, name }) => <Link to={`/doctor/${id}`}>{name}</Link>,
      },
      {
        title: "Actualizat",
        dataIndex: "updated_at",
        render: (rowData) => date(rowData).full,
      },
      {
        title: "Conținut",
        dataIndex: "content",
        render: (rowData) => (
          <Typography.Paragraph className="mb-0" ellipsis={{ rows: 2 }}>
            {rowData}
          </Typography.Paragraph>
        ),
      },
      {
        title: "Acțiuni",
        render: (_, row) => (
          <>
            <Link to={`/internal/${row.id}`}>
              <Button type="primary" size="small">
                Vezi chat-ul
              </Button>
            </Link>
          </>
        ),
      },
    ],
    []
  );

  if (error) {
    return (
      <Alert
        className="mt-5"
        showIcon
        type="error"
        message="Error"
        description="A apărut o eroare!"
      />
    );
  }

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={`Lista de chat-uri interne (${internalChats?.total || 0})`}
      />
      <DcTable
        dataColumns={columns}
        dataSource={internalChats?.data || []}
        loading={isLoading}
        onTabelChange={onTableChange}
        pagination={{
          position: ["bottomRight"],
          per_page: internalChats?.per_page,
          total: internalChats?.total,
          current_page: internalChats?.current_page,
        }}
      />
    </>
  );
}
