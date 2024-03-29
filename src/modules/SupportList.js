import { Alert, Badge, Button, Tag, Typography } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import { DcTable } from "../components";
import { CHAT_FLAGS } from "../context/constants";
import {
  getSupportList,
  cleanSupportList,
  setCleanOnUnmountFalse,
  setCleanOnUnmountTrue,
} from "../store/actions/supportListAction";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

const tableStateKey = "support-list-state";

const CHAT_FLAGS_COLORS = {
  OPEN: "green",
  IN_WORK: "orange",
  CLOSED: "red",
};

export default function SupportList() {
  const [state, setState] = useSessionStorage(tableStateKey, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { supports, cleanOnUnmount } = useSelector((store) => ({
    supports: store.supportList.payload,
    cleanOnUnmount: store.supportList.cleanOnUnmount,
  }));
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const { page, sort_column, sort_direction } = state;

    setLoading(true);

    dispatch(getSupportList({ page, sort_column, sort_direction }))
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
  }, [dispatch, error, state]);

  useMount(() => {
    dispatch(setCleanOnUnmountTrue());
  });

  useUnmount(() => {
    if (cleanOnUnmount) {
      sessionStorage.removeItem(tableStateKey);
      dispatch(cleanSupportList());
    }
  });

  const onTableChange = useCallback(
    (pagination) => {
      const newState = { ...state };

      newState.page = pagination.current;

      setState(newState);
    },
    [setState, state],
  );

  const onTableLinksClick = useCallback(
    (path) => async (e) => {
      e.preventDefault();

      await dispatch(setCleanOnUnmountFalse());
      history.push(path);
    },
    [dispatch, history],
  );

  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id" },
      {
        title: "Utlizator",
        dataIndex: "user",
        render: (rowData) => (
          <a href={`/user/${rowData?.id}`} onClick={onTableLinksClick(`/user/${rowData?.id}`)}>
            {rowData?.name}
          </a>
        ),
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
        title: "Regiune",
        dataIndex: "region",
      },
      {
        title: "Flag",
        dataIndex: "flag",
        render: (rowData) => <Tag color={CHAT_FLAGS_COLORS[rowData]}>{CHAT_FLAGS[rowData]}</Tag>,
      },
      {
        title: "Acțiuni",
        render: (_, row) => (
          <>
            <Badge count={row.new} size="small">
              <Button type="primary" size="small" onClick={onTableLinksClick(`/support/${row.id}`)}>
                Vezi chat-ul
              </Button>
            </Badge>
          </>
        ),
      },
    ],
    [onTableLinksClick],
  );

  if (error) {
    return <Alert showIcon type="error" message="Error" description="A apărut o eroare!" />;
  }

  return (
    <>
      <DcTable
        dataColumns={columns}
        dataSource={supports?.data || []}
        loading={loading}
        onTabelChange={onTableChange}
        pagination={{
          position: ["bottomRight"],
          per_page: supports?.per_page,
          total: supports?.total,
          current_page: supports?.current_page,
        }}
      />
    </>
  );
}
