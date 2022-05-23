import PropTypes from "prop-types";
import { Alert, Tag } from "antd";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import usePrevious from "../hooks/usePrevious";
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
  const { simplified, title, extra, searchedList } = props;
  const [state, setState] = useSessionStorage(tableStateKey + window.location.search, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeList, setActiveList] = useState([]);
  const { doctors, cleanOnUnmount } = useSelector((store) => ({
    doctors: store.doctorsList.payload,
    cleanOnUnmount: store.doctorsList.cleanOnUnmount,
  }));
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchedList) {
      setActiveList(searchedList);
    } else {
      setActiveList(doctors?.data);
    }
  }, [doctors?.data, searchedList]);

  useEffect(() => {
    const { page, sort_column, sort_direction } = state;
    const limit = simplified ? 10 : 20;

    const hidden = {};

    // if (params.has("hidden")) hidden.hidden = true;

    setLoading(true);

    dispatch(getDoctorsList({ page, sort_column, sort_direction, limit, ...hidden }))
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
      sessionStorage.removeItem(tableStateKey + window.location.search);
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
    (path) => async (e) => {
      e.preventDefault();

      await dispatch(setCleanOnUnmountFalse());
      history.push(path);
    },
    [dispatch, history]
  );

  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id" },
      {
        title: "Nume",
        dataIndex: "name",
        render: (rowData, { id }) => (
          <a href={`/doctor/${id}`} onClick={onTableLinksClick(`/doctor/${id}`)}>
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
        title: "Specialitate",
        dataIndex: "speciality",
        ellipsis: true,
        render: (rowData) => rowData.join(", "),
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
    <DcTable
      title={title}
      dataColumns={columns}
      dataSource={activeList || []}
      loading={loading}
      onTabelChange={onTableChange}
      rowClassName={(row) => row.inVacation && "chat-row-closed"}
      pagination={{
        position: [simplified ? "none" : "bottomRight"],
        per_page: doctors?.per_page,
        total: doctors?.total,
      }}
      extra={extra}
    />
  );
}

DoctorsList.propTypes = {
  simplified: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.element,
  searchedList: PropTypes.array,
};
