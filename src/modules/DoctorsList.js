import PropTypes from "prop-types";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Alert, Badge, Button, Input, PageHeader, Table } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import date from "../utils/date";
import api from "../utils/appApi";
import useTableState from "../hooks/usePaginatedQueryState";
import useDebounce from "../hooks/useDebounce";
import { useSelector } from "react-redux";

export default function DoctorsList() {
  const { requestsCount } = useSelector((store) => ({
    requestsCount: store.requestsCount,
  }));

  const { page, sortColumn, sortDirection, setPage, onTableChange } = useTableState("doctors-list");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [displayHiddenDoctors] = useState(
    new URLSearchParams(window.location.search).has("hidden")
  );

  const {
    data: doctors,
    isLoading,
    isError,
  } = useQuery(
    ["doctors", page, sortColumn, sortDirection, debouncedSearch, displayHiddenDoctors],
    () =>
      api.doctors.get({
        page,
        sort_column: sortColumn,
        sort_direction: sortDirection === "ascend" ? "asc" : "desc",
        search: debouncedSearch,
        hidden: displayHiddenDoctors ? 1 : 0,
      })
  );

  useDebounce(
    () => {
      if (search.length > 2) {
        setDebouncedSearch(search);
        setPage(1);
      } else {
        setDebouncedSearch("");
      }
    },
    500,
    [search]
  );

  if (isError) {
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
      <PageHeader
        className="site-page-header"
        title={`Doctori ${displayHiddenDoctors ? "ascunși" : ""} (${doctors?.total || 0})`}
        extra={[
          <Badge key="doctors-list-requests" count={requestsCount.count} showZero>
            <Link to="/requests">
              <Button type="primary">Cereri</Button>
            </Link>
          </Badge>,
        ]}
      />

      <Input
        className="mb-3"
        placeholder="Nume, Prenume"
        addonBefore={<SearchOutlined />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table
        bordered
        scroll={{ x: 900 }}
        size="small"
        rowKey={(record) => record.id}
        sortDirections={["descend", "ascend", "descend"]}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            sorter: true,
            sortOrder: sortColumn === "id" && sortDirection,
          },
          {
            title: "Nume",
            dataIndex: "name",
            render: (rowData, { id }) => <Link to={`/doctor/${id}`}>{rowData}</Link>,
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
          },
          {
            title: "Vânzări",
            dataIndex: "sales",
            sorter: true,
            sortOrder: sortColumn === "sales" && sortDirection,
            render: (rowData) => `${rowData} MDL`,
          },
          {
            title: "Solicitări",
            dataIndex: "requests",
            sorter: true,
            sortOrder: sortColumn === "requests" && sortDirection,
          },
          {
            title: "Solicitări repetate",
            dataIndex: "repeat_requests",
            sorter: true,
            sortOrder: sortColumn === "repeat_requests" && sortDirection,
          },
          {
            title: "Ultima accesare",
            dataIndex: "last_seen",
            render: (rowData) => (rowData ? date(rowData).full : "Necunoscut"),
          },
        ]}
        dataSource={doctors?.data || []}
        loading={isLoading}
        pagination={{
          position: ["bottomRight"],
          current: doctors?.current_page || 1,
          pageSize: doctors?.per_page || 20,
          total: doctors?.total || 0,
          showSizeChanger: false,
        }}
        onChange={onTableChange}
      />
    </>
  );
}

DoctorsList.propTypes = {
  simplified: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.element,
};
