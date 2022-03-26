import { Alert, Tag, Button } from "antd";
import { useCallback, useMemo } from "react";
import { useMount, useSessionStorage } from "react-use";
import { DcTable } from "../components";
import { useQuery } from "react-query";
import date from "../utils/date";
import api from "../utils/appApi";
import fetcher from "../utils/fetcher";
import { useDispatch } from "react-redux";
import { updateCouncilCount } from "../store/actions/supportListAction";
import { Link } from "react-router-dom";
import { getChatStatus } from "./ChatsList";

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
  const dispatch = useDispatch();

  const {
    data: withdrawalList,
    isLoading,
    error,
  } = useQuery([tableStateKey, state], fetcher(api.council.get));

  useMount(() => dispatch(updateCouncilCount()));

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
        title: "Client",
        dataIndex: "client",
        render: ({ id, name }) => <Link to={`/user/${id}`}>{name}</Link>,
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (_, data) => getChatStatus(data),
      },
      { title: "Doctori asignați", dataIndex: "doctors" },
      {
        title: "Actualizat",
        dataIndex: "updated_at",
        render: (rowData) => date(rowData).full,
      },
      {
        title: "Acțiuni",
        render: (_, row) => (
          <>
            <Link to={`/council/${row.id}`}>
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
