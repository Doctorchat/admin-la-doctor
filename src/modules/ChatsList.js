import { Alert, Tag } from "antd";
import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import { DcTable } from "../components";
import {
  cleanChatsList,
  getChatsList,
  setCleanOnUnmountFalse,
  setCleanOnUnmountTrue,
} from "../store/actions/chatsListAction";
import date from "../utils/date";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

const chatStatuses = {
  initied: <Tag color="blue">Inițializat</Tag>,
  open: <Tag color="orange">În așteptare</Tag>,
  closed: <Tag>Arhivat</Tag>,
  responded: <Tag color="green">Răspuns primit</Tag>,
  unpaid: <Tag color="red">Achitare</Tag>,
};

const chatTypes = {
  standard: <Tag>Standard</Tag>,
  consilium: <Tag color="#FFD700">Consiliu</Tag>,
  auto: <Tag>Auto</Tag>,
};

const tableStateKey = "chats-list-state";

export default function ChatsList(props) {
  const { simplified, title, extra } = props;
  const [state, setState] = useSessionStorage(tableStateKey, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { chats, cleanOnUnmount } = useSelector((store) => ({
    chats: store.chatsList.payload,
    cleanOnUnmount: store.chatsList.cleanOnUnmount,
  }));
  const history = useHistory();
  const dispatch = useDispatch();

  const fetcher = useCallback(async () => {
    const { page, sort_column, sort_direction } = state;
    const limit = simplified ? 10 : 20;

    setLoading(true);

    try {
      await dispatch(getChatsList({ page, sort_column, sort_direction, limit }));
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
      dispatch(cleanChatsList());
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
    async (e) => {
      e.preventDefault();

      await dispatch(setCleanOnUnmountFalse());
      history.push(e.target.href);
    },
    [dispatch, history]
  );

  const columns = useMemo(
    () => [
      {
        title: "Doctor",
        dataIndex: "name",
        render: (rowData, { id }) => (
          <Link to={`/doctor/${id}`} onClick={onTableLinksClick}>
            {rowData}
          </Link>
        ),
      },
      {
        title: "Client",
        dataIndex: "client",
        render: (rowData, { id }) => (
          <Link to={`/user/${id}`} onClick={onTableLinksClick}>
            {rowData}
          </Link>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (rowData) => chatStatuses[rowData] || rowData,
      },
      {
        title: "Tipul",
        dataIndex: "type",
        render: (rowData) => chatTypes[rowData] || rowData,
      },
      {
        title: "Actualizat",
        dataIndex: "updated_at",
        render: (rowData) => date(rowData).dynamic(),
      },
    ],
    [onTableLinksClick]
  );

  if (error) {
    return (
      <Alert showIcon type="error" message={`Error ${error.status}`} description={error.message} />
    );
  }

  return (
    <DcTable
      title={title}
      dataColumns={columns}
      dataSource={chats?.data || []}
      loading={loading}
      onTabelChange={onTableChange}
      pagination={{
        position: [simplified ? "none" : "bottomRight"],
        per_page: chats?.per_page,
        total: chats?.total,
        current_page: chats?.current_page,
      }}
      extra={extra}
    />
  );
}

ChatsList.propTypes = {
  simplified: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.element,
};
