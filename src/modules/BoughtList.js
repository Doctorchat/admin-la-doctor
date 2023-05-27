import { Alert } from "antd";
import { useCallback, useMemo } from "react";
import { useSessionStorage } from "react-use";
import { DcTable } from "../components";
import { useQuery } from "react-query";
import api from "../utils/appApi";
import fetcher from "../utils/fetcher";
import { Link } from "react-router-dom";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

const tableStateKey = "bought-list-state";

export default function BoughtList() {
  const [state, setState] = useSessionStorage(tableStateKey, initialState);

  const { data: boughtList, isLoading, error } = useQuery([tableStateKey, state], fetcher(api.chats.bought));

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
        title: "Client",
        dataIndex: "client",
        render: ({ name, id }) => <Link to={`/user/${id}`}>{name}</Link>,
      },
      {
        title: "Telefon",
        dataIndex: "client",
        render: ({ phone }) => phone,
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        render: ({ name, id }) => <Link to={`/doctor/${id}`}>{name}</Link>,
      },
      {
        title: "Doctor Rating",
        dataIndex: "doctor",
        render: ({ rating }) => rating,
      },
    ],
    []
  );

  if (error) {
    return <Alert className="mt-5" showIcon type="error" message="Error" description="A apărut o eroare!" />;
  }

  return (
    <>
      <DcTable
        dataColumns={columns}
        dataSource={boughtList?.data || []}
        loading={isLoading}
        onTabelChange={onTableChange}
        pagination={{
          position: ["bottomRight"],
          per_page: boughtList?.per_page,
          total: boughtList?.total,
          current_page: boughtList?.current_page,
        }}
      />
    </>
  );
}
