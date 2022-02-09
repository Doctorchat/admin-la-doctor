import PropTypes from "prop-types";
import { Alert, Button, Tag } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import { DcTable } from "../components";
import {
  cleanTransactionsList,
  getTransactionsList,
  setCleanOnUnmountTrue,
  setCleanOnUnmountFalse,
} from "../store/actions/transactionsListAction";
import date from "../utils/date";
import { useHistory } from "react-router-dom";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

export const transactionsStatuses = {
  confirmed: <Tag color="green">Confirmat</Tag>,
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
  const history = useHistory();

  useEffect(() => {
    const { page, sort_column, sort_direction } = state;
    const limit = simplified ? 10 : 20;

    setLoading(true);

    dispatch(getTransactionsList({ page, sort_column, sort_direction, limit }))
      .catch(() => {
        if (error.response.status === 500) {
          setError({
            status: error.response.status,
            message: error.response.data.message,
          });
          sessionStorage.removeItem(tableStateKey);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, error, simplified, state]);

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

  const onTableLinksClick = useCallback(
    (path) => async () => {
      await dispatch(setCleanOnUnmountFalse());
      history.push(path);
    },
    [dispatch, history]
  );

  const columns = useMemo(
    () => [
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
      {
        title: "Card",
        dataIndex: "card",
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (rowData) => transactionsStatuses[rowData],
      },
      {
        title: "Acțiuni",
        render: (_, row) => (
          <>
            <Button type="primary" size="small" onClick={onTableLinksClick(`/chat/${row.chat}`)}>
              Vezi chat-ul
            </Button>
          </>
        ),
      },
    ],
    [onTableLinksClick]
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
