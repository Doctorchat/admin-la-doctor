import PropTypes from "prop-types";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Alert, Input, PageHeader, Table } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import date from "../utils/date";
import api from "../utils/appApi";
import useTableState from "../hooks/usePaginatedQueryState";
import useDebounce from "../hooks/useDebounce";

export default function UsersList() {
  const { page, sortColumn, sortDirection, setPage, onTableChange } = useTableState("users-list");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery(["users", page, sortColumn, sortDirection, debouncedSearch], () =>
    api.users.get({
      page,
      sort_column: sortColumn,
      sort_direction: sortDirection === "ascend" ? "asc" : "desc",
      search: debouncedSearch,
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
      <PageHeader className="site-page-header" title={`Utilizatori (${users?.total || ""})`} />

      <Input
        className="mb-3"
        placeholder="Nume, Prenume"
        addonBefore={<SearchOutlined />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Table
        bordered
        scroll={{ x: 600 }}
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
            render: (rowData, { id }) => <Link to={`/user/${id}`}>{rowData}</Link>,
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
            title: "Cheltuieli",
            dataIndex: "revenue",
            sorter: true,
            sortOrder: sortColumn === "revenue" && sortDirection,
            render: (rowData) => `${rowData} MDL`,
          },
          {
            title: "Întrebări",
            dataIndex: "tickets",
            sorter: true,
            sortOrder: sortColumn === "tickets" && sortDirection,
          },
          {
            title: "Ultima accesare",
            dataIndex: "last_seen",
            render: (rowData) => (rowData ? date(rowData).full : "Necunoscut"),
          },
        ]}
        dataSource={users?.data || []}
        loading={isLoading}
        pagination={{
          position: ["bottomRight"],
          current: users?.current_page || 1,
          pageSize: users?.per_page || 20,
          total: users?.total || 0,
          showSizeChanger: false,
        }}
        onChange={onTableChange}
      />
    </>
  );
}

UsersList.propTypes = {
  simplified: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.element,
};
