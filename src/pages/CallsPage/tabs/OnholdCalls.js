import { Button, Table, notification } from "antd";
import { useQuery } from "react-query";

import useTableState from "../../../hooks/usePaginatedQueryState";
import api from "../../../utils/appApi";
import { useCallback, useState } from "react";
import UserDetails from "./UserDetails";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessages";

export default function OnholdCalls() {
  const { page, sortColumn, sortDirection, onTableChange } = useTableState("onhold-calls");

  const [user, setUser] = useState(null);

  const {
    data: onholdCalls,
    isLoading,
    refetch,
  } = useQuery(["onhold-calls", page, sortColumn, sortDirection], () =>
    api.calls.onhold({
      page,
      sort_column: sortColumn,
      sort_direction: sortDirection === "ascend" ? "asc" : "desc",
    })
  );

  const onAssignUser = useCallback(
    async (user) => {
      try {
        await api.calls.assign(user.id);

        refetch();
        setUser(user);
      } catch (error) {
        notification.error({
          message: "Eroare",
          description: getApiErrorMessage(error),
        });
      }
    },
    [refetch]
  );

  return (
    <>
      <UserDetails
        user={user}
        onClose={() => {
          setUser(null);
          refetch();
        }}
      />

      <Table
        bordered
        scroll={{ x: 700 }}
        size="small"
        rowKey={(record) => record.id}
        sortDirections={["descend", "ascend", "descend"]}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            sorter: false,
            sortOrder: sortColumn === "id" && sortDirection,
          },
          {
            title: "Nume",
            dataIndex: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Data înregistrării",
            dataIndex: "created_at",
            sorter: false,
            sortOrder: sortColumn === "created_at" && sortDirection,
            render: (rowData) => new Date(rowData).toLocaleDateString("ro-RO"),
          },
          {
            title: "Acțiuni",
            width: 100,
            render: (_, record) => (
              <Button
                type="primary"
                disabled={!!record.manager_id}
                onClick={() => onAssignUser(record)}
              >
                Asignează
              </Button>
            ),
          },
        ]}
        dataSource={onholdCalls?.data || []}
        loading={isLoading}
        pagination={{
          position: ["bottomRight"],
          current: onholdCalls?.current_page || 1,
          pageSize: onholdCalls?.per_page || 20,
          total: onholdCalls?.total || 0,
          showSizeChanger: false,
        }}
        onChange={onTableChange}
      />
    </>
  );
}
