import PropTypes from "prop-types";
import { Alert, Tag } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import { DcTable } from "../components";
import {
  cleanTransactionsList,
  getTransactionsList,
  setCleanOnUnmountTrue,
} from "../store/actions/transactionsListAction";
import date from "../utils/date";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

const tableStateKey = "transactions-list-state";

export default function TransactionsList(props) {
  const { simplified, title, extra } = props;
  const [state, setState] = useSessionStorage(tableStateKey, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { transactions, cleanOnUnmount } = useSelector((store) => ({
    transactions: store.transactionsList.payload,
    cleanOnUnmount: store.transactionsList.cleanOnUnmount,
  }));
  const dispatch = useDispatch();

  const fetcher = useCallback(async () => {
    const { page, sort_column, sort_direction } = state;
    const limit = simplified ? 10 : 20;

    setLoading(true);

    try {
      await dispatch(getTransactionsList({ page, sort_column, sort_direction, limit }));
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
  }, [dispatch, simplified, state]);

  useEffect(fetcher, [fetcher]);

  useMount(() => {
    dispatch(setCleanOnUnmountTrue());
  });

  useUnmount(() => {
    if (cleanOnUnmount) {
      sessionStorage.removeItem(tableStateKey);
      dispatch(cleanTransactionsList());
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
        render: (rowData) => `#${rowData}`,
      },
      {
        title: "Data",
        dataIndex: "created_at",
        render: (rowData) => date(rowData).full,
      },

      {
        title: "Status",
        dataIndex: "status",
        render: (rowData) => <Tag>{rowData}</Tag>,
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
        title={title}
        dataColumns={columns}
        dataSource={transactions?.data || []}
        loading={loading}
        onTabelChange={onTableChange}
        pagination={{
          position: [simplified ? "none" : "bottomRight"],
          per_page: transactions?.per_page,
          total: transactions?.total,
          current_page: transactions?.current_page,
        }}
        extra={extra}
      />
    </>
  );
}

TransactionsList.propTypes = {
  simplified: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.element,
};
