import PropTypes from "prop-types";
import { Alert, Tag } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import { DcTable } from "../components";
import {
  cleanUsersList,
  getUsersList,
  setCleanOnUnmountFalse,
  setCleanOnUnmountTrue,
} from "../store/actions/usersListAction";
import date from "../utils/date";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

const tableStateKey = "users-list-state";

export default function UsersList(props) {
  const { simplified, title, extra } = props;
  const [state, setState] = useSessionStorage(tableStateKey, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { users, cleanOnUnmount } = useSelector((store) => ({
    users: store.usersList.payload,
    cleanOnUnmount: store.usersList.cleanOnUnmount,
  }));
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const { page, sort_column, sort_direction } = state;
    const limit = simplified ? 10 : 20;

    setLoading(true);

    dispatch(getUsersList({ page, sort_column, sort_direction, limit }))
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
      dispatch(cleanUsersList());
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
        title: "Nume",
        dataIndex: "name",
        render: (rowData, { id }) => (
          <a href={`/user/${id}`} onClick={onTableLinksClick(`/user/${id}`)}>
            {rowData}
          </a>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Telefon",
        dataIndex: "phone",
      },
      {
        title: "Întrebări",
        dataIndex: "questions_count",
      },
      {
        title: "Ultima accesare",
        dataIndex: "last_seen",
        render: (rowData, row) => {
          if (row.isOnline) {
            return <Tag color="#06f">Online</Tag>;
          }

          return rowData ? date(rowData).full : "Necunoscut";
        },
      },
    ],
    [onTableLinksClick]
  );

  if (error) {
    return <Alert showIcon type="error" message="Error" description="A apărut o eroare!" />;
  }

  return (
    <DcTable
      title={title}
      dataColumns={columns}
      dataSource={users?.data || []}
      loading={loading}
      onTabelChange={onTableChange}
      pagination={{
        position: [simplified ? "none" : "bottomRight"],
        per_page: users?.per_page,
        total: users?.total,
        current_page: users?.current_page,
      }}
      extra={extra}
    />
  );
}

UsersList.propTypes = {
  simplified: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.element,
};
