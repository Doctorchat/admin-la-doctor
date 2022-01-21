import PropTypes from "prop-types";
import { Alert } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import { DcTable } from "../components";
import {
  cleanDoctorsList,
  getDoctorsList,
  setCleanOnUnmountFalse,
  setCleanOnUnmountTrue,
} from "../store/actions/doctorsListAction";
import date from "../utils/date";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

const tableStateKey = "doctors-list-state";

export default function DoctorsList(props) {
  const { simplified, title, extra } = props;
  const [state, setState] = useSessionStorage(tableStateKey, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { doctors, cleanOnUnmount } = useSelector((store) => ({
    doctors: store.doctorsList.payload,
    cleanOnUnmount: store.doctorsList.cleanOnUnmount,
  }));
  const history = useHistory();
  const dispatch = useDispatch();

  const fetcher = useCallback(async () => {
    const { page, sort_column, sort_direction } = state;
    const limit = simplified ? 10 : 20;

    setLoading(true);

    try {
      await dispatch(getDoctorsList({ page, sort_column, sort_direction, limit }));
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
      dispatch(cleanDoctorsList());
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
        title: "Nume",
        dataIndex: "name",
        render: (rowData, { id }) => (
          <Link to={`/doctor/${id}`} onClick={onTableLinksClick}>
            {rowData}
          </Link>
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
        title: "Specialitate",
        dataIndex: "speciality",
      },
      {
        title: "Ultima accesare",
        dataIndex: "last_seen",
        render: (rowData) => (rowData ? date(rowData).dynamic() : "Necunoscut"),
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
      dataSource={doctors?.data || []}
      loading={loading}
      onTabelChange={onTableChange}
      pagination={{
        position: [simplified ? "none" : "bottomRight"],
        per_page: doctors?.per_page,
        total: doctors?.total,
        current_page: doctors?.current_page,
      }}
      extra={extra}
    />
  );
}

DoctorsList.propTypes = {
  simplified: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.element,
};
