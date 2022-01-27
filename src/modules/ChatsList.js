import { Alert, Tag } from "antd";
import PropTypes from "prop-types";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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

export const chatStatuses = {
  initied: { color: "blue", text: "Inițializat" },
  open: { color: "orange", text: "În așteptare" },
  closed: { color: "", text: "Arhivat" },
  responded: { color: "green", text: "Răspuns primit" },
  unpaid: { color: "red", text: "Achitare" },
  overdue: { color: "#dc3545", text: "Overdue" },
};

export const chatTypes = {
  standard: <Tag>Standard</Tag>,
  consilium: <Tag color="#FFD700">Consiliu</Tag>,
  auto: <Tag>Auto</Tag>,
  meet: <Tag color="#34a853">Meeting</Tag>,
};

export const getChatStatus = (chat) => {
  const tags = [chat.status];

  if (chat.isOverdue) tags.push("overdue");

  return tags.map((status) => (
    <Tag key={`${chat.id}-${chatStatuses[status].color}`} color={chatStatuses[status].color}>
      {chatStatuses[status].text}
    </Tag>
  ));
};

export const getChatType = (chat) => {
  if (chat.isMeet) {
    return chatTypes.meet;
  }

  if (chat.type === 'auto' && chat.doctor.id === 1) {
    return <Tag color="#ff4d4f">Auto</Tag>
  }

  return chatTypes[chat.type];
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

  useMount(() => {
    fetcher();
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
    (path) => async (e) => {
      e.preventDefault();

      await dispatch(setCleanOnUnmountFalse());
      history.push(path);
    },
    [dispatch, history]
  );

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        render: (rowData) => (
          <a href={`/chat/${rowData}`} onClick={onTableLinksClick(`/chat/${rowData}`)}>
            #{rowData}
          </a>
        ),
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        render: ({ id, name }) => (
          <a href={`/doctor/${id}`} onClick={onTableLinksClick(`/doctor/${id}`)}>
            {name}
          </a>
        ),
      },
      {
        title: "Client",
        dataIndex: "client",
        render: ({ id, name }) => (
          <a href={`/user/${id}`} onClick={onTableLinksClick(`/user/${id}`)}>
            {name}
          </a>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (_, data) => getChatStatus(data),
      },
      {
        title: "Tipul",
        dataIndex: "type",
        render: (_, data) => getChatType(data),
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
      <Alert className="mt-5" showIcon type="error" message={`Error ${error.status}`} description={error.message} />
    );
  }

  return (
    <DcTable
      title={title}
      dataColumns={columns}
      dataSource={chats?.data || []}
      loading={loading}
      onTabelChange={onTableChange}
      rowClassName={(row) => row.status === "closed" && "chat-row-closed"}
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
