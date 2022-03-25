import { Alert, Tag } from "antd";
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
  success: <Tag color="green">Confirmat</Tag>,
  initied: <Tag>Inițializat</Tag>,
};

const tableStateKey = "withdrawal-approved-list-state";

export default function WithdrawalApprovedList() {
  const [state, setState] = useSessionStorage(tableStateKey, initialState);

  const {
    data: withdrawalList,
    isLoading,
    error,
  } = useQuery([tableStateKey, state], fetcher(api.withdrawal.approved));

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
      {
        title: "Doctor",
        dataIndex: "user",
        render: ({ name, id }) => <Link to={`/doctor/${id}`}>{name}</Link>,
      },
      {
        title: "Data",
        dataIndex: "created_at",
        render: (rowData) => date(rowData).full,
      },
      {
        title: "Suma",
        dataIndex: "amount",
        render: (rowData) => `${rowData} Lei`,
      },
      { title: "Status", dataIndex: "status", render: (rowData) => transactionsStatuses[rowData] },
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
      <DcTable
        dataColumns={columns}
        dataSource={withdrawalList?.data || []}
        loading={isLoading}
        onTabelChange={onTableChange}
        rowClassName="chat-row-closed"
        pagination={{
          position: ["bottomRight"],
          per_page: withdrawalList?.per_page,
          total: withdrawalList?.total,
          current_page: withdrawalList?.current_page,
        }}
      />
    </>
  );
}
