import { Alert, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import { DcTable } from "../components";
import { getLogsList, setCleanOnUnmountTrue, cleanLogsList } from "../store/actions/logsAction";
import date from "../utils/date";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

const tableStateKey = "logs-list-state";

export default function LogsList() {
  const [state, setState] = useSessionStorage(tableStateKey, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { logs, cleanOnUnmount } = useSelector((store) => ({
    logs: store.logsList.payload,
    cleanOnUnmount: store.logsList.cleanOnUnmount,
  }));
  const dispatch = useDispatch();

  const fetcher = useCallback(async () => {
    const { page, sort_column, sort_direction } = state;

    setLoading(true);

    try {
      await dispatch(getLogsList({ page, sort_column, sort_direction }));
    } catch (error) {
      if (error.response.status === 500) {
        setError({
          status: error.response.status,
          message: error.response.data.message,
        });
        sessionStorage.removeItem(tableStateKey);
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, state]);

  useEffect(fetcher, [fetcher]);

  useMount(() => {
    dispatch(setCleanOnUnmountTrue());
  });

  useUnmount(() => {
    if (cleanOnUnmount) {
      sessionStorage.removeItem(tableStateKey);
      dispatch(cleanLogsList());
    }
  });

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
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "IP",
        dataIndex: "ip",
      },
      {
        title: "Acțiune",
        dataIndex: "action",
      },
      {
        title: "Agent",
        dataIndex: "agent",
        render: (rowData) => (
          <Typography.Paragraph
            className="mb-0"
            ellipsis={{ rows: 1, expandable: true, symbol: "Vezi mai mult" }}
          >
            {rowData}
          </Typography.Paragraph>
        ),
      },
      {
        title: "Data",
        dataIndex: "created_at",
        render: (rowData) => date(rowData).full,
      },
    ],
    []
  );

  if (error) {
    return <Alert showIcon type="error" message="Error" description="A apărut o eroare!" />;
  }

  return (
    <>
      <DcTable
        dataColumns={columns}
        dataSource={logs?.data || []}
        loading={loading}
        onTabelChange={onTableChange}
        pagination={{
          position: ["bottomRight"],
          per_page: logs?.per_page,
          total: logs?.total,
          current_page: logs?.current_page,
        }}
      />
    </>
  );
}
