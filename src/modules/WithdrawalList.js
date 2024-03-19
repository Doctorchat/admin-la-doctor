import PropTypes from "prop-types";
import { Alert, Button, notification, Popconfirm, Tag, PageHeader } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import { DcTable } from "../components";
import {
  cleanWithdrawalList,
  getWithdrawalList,
  setCleanOnUnmountTrue,
  setCleanOnUnmountFalse,
  onWithdrawalApproveSuccess,
  updateWithdrawalCount,
} from "../store/actions/withdrawalAction";
import date from "../utils/date";
import { useHistory } from "react-router-dom";
import api from "../utils/appApi";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

export const transactionsStatuses = {
  success: <Tag color="green">Confirmat</Tag>,
  pending: <Tag>Inițializat</Tag>,
};

const tableStateKey = "withdrawal-list-state";

export default function WithdrawalList(props) {
  const { simplified, title, extra } = props;
  const [state, setState] = useSessionStorage(tableStateKey, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { withdrawalList, cleanOnUnmount } = useSelector((store) => ({
    withdrawalList: store.withdrawal.payload,
    cleanOnUnmount: store.withdrawal.cleanOnUnmount,
  }));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const { page, sort_column, sort_direction } = state;
    const limit = simplified ? 10 : 20;

    setLoading(true);

    dispatch(getWithdrawalList({ page, sort_column, sort_direction, limit }))
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
    dispatch(updateWithdrawalCount());
  });

  useUnmount(() => {
    if (cleanOnUnmount) {
      sessionStorage.removeItem(tableStateKey);
      dispatch(cleanWithdrawalList());
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

  const confirmHandler = useCallback(
    (id) => async () => {
      try {
        await api.withdrawal.approve(id);

        dispatch(onWithdrawalApproveSuccess(id));
        dispatch(updateWithdrawalCount());

        notification.success({
          message: "Succes",
          description: "Cererea a fost aprobată cu succes",
        });
      } catch (error) {
        notification.error({ message: "Eroare", description: "A apărut o eroare" });
      }
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id" },
      {
        title: "Doctor",
        dataIndex: "user",
        render: ({ name, id }) => (
          <a href={`/doctor/${id}`} onClick={onTableLinksClick(`/doctor/${id}`)}>
            {name}
          </a>
        ),
      },
      {
        title: "Data",
        dataIndex: "created_at",
        render: (rowData) => date(rowData).full,
      },
      {
        title: "Suma",
        render: ({ amount, currency }) => `${amount} ${currency}`,
      },
      { title: "Status", dataIndex: "status", render: (rowData) => transactionsStatuses[rowData] },
      {
        title: "Acțiuni",
        render: (_, row) => (
          <>
            <Popconfirm
              okText="Confirmă"
              cancelText="Anulează"
              title="Ești sigur că vreai să accepți această cerere?"
              onConfirm={confirmHandler(row.id)}
              placement="left"
            >
              <Button type="primary" size="small" className="me-2">
                Acceptă
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ],
    [confirmHandler, onTableLinksClick]
  );

  if (error) {
    return <Alert className="mt-5" showIcon type="error" message="Error" description="A apărut o eroare!" />;
  }

  return (
    <>
      <PageHeader className="site-page-header" title={`Solicitari (${withdrawalList?.total || 0})`} />
      <DcTable
        title={title}
        dataColumns={columns}
        dataSource={withdrawalList?.data || []}
        loading={loading}
        onTabelChange={onTableChange}
        pagination={{
          position: [simplified ? "none" : "bottomRight"],
          per_page: withdrawalList?.per_page,
          total: withdrawalList?.total,
          current_page: withdrawalList?.current_page,
        }}
        extra={extra}
      />
    </>
  );
}

WithdrawalList.propTypes = {
  simplified: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.element,
};
