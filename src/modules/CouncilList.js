import { Alert, Tag } from "antd";
import { useCallback, useMemo } from "react";
import { useSessionStorage } from "react-use";
import { DcTable } from "../components";
import { useQuery } from "react-query";
import date from "../utils/date";
import api from "../utils/appApi";
import fetcher from "../utils/fetcher";

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

export default function CouncilList() {
  const [state, setState] = useSessionStorage(tableStateKey, initialState);

  const {
    data: withdrawalList,
    isLoading,
    error,
  } = useQuery([tableStateKey, state], fetcher(api.support.get));

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
        title: "id",
        dataIndex: "id",
      },
      {
        title: "content",
        dataIndex: "content",
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
      <DcTable
        dataColumns={columns}
        dataSource={withdrawalList?.data || []}
        loading={isLoading}
        onTabelChange={onTableChange}
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
