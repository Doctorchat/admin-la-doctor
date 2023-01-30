import { Button, Modal, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import useTableState from "../../../hooks/usePaginatedQueryState";
import api from "../../../utils/appApi";
import { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import date from "../../../utils/date";

export default function ClosedCalls() {
  const { page, sortColumn, sortDirection, onTableChange } = useTableState("closed-calls");

  const [details, setDetails] = useState(null);

  const { data: usersToCall, isLoading } = useQuery(
    ["closed-calls", page, sortColumn, sortDirection],
    () =>
      api.calls.closed({
        page,
        sort_column: sortColumn,
        sort_direction: sortDirection === "ascend" ? "asc" : "desc",
      })
  );
  const { data: sources } = useQuery(["calls-sources"], () => api.calls.sources(), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <>
      <Modal footer={null} open={!!details} onCancel={() => setDetails(null)}>
        <Typography.Title level={5}>Problema</Typography.Title>
        <Typography.Text>{details?.problem ?? "---"}</Typography.Text>

        <Typography.Title level={5}>Sugestie</Typography.Title>
        <Typography.Text>{details?.suggest ?? "---"}</Typography.Text>
      </Modal>
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
            title: "Manager",
            dataIndex: "manager",
            render: ({ name }) => name,
          },
          {
            title: "Utilizator",
            dataIndex: "user",
            render: ({ name }) => <Link to={`/users/${name}`}>{name}</Link>,
          },
          {
            title: "Problema & Sugestie",
            dataIndex: "problem",
            width: 200,
            render: (_, record) => (
              <Button
                icon={<EyeOutlined />}
                className="d-flex align-items-center"
                type="dashed"
                onClick={() => setDetails(record)}
              >
                Vezi detalii
              </Button>
            ),
          },
          {
            title: "Sursă",
            dataIndex: "source",
            render: (rowData) =>
              sources?.find((source) => Number(source.value) === Number(rowData))?.label,
          },
          {
            title: "A cumpărat?",
            dataIndex: "bought",
            render: (rowData, record) => {
              if (rowData) {
                return new Intl.NumberFormat("ro-RO", {
                  style: "currency",
                  currency: "MDL",
                }).format(record.revenue ?? 0);
              }

              return "Nu";
            },
          },
          {
            title: "Data",
            dataIndex: "created_at",
            sorter: false,
            sortOrder: sortColumn === "created_at" && sortDirection,
            render: (rowData) => date(rowData).full,
          },
        ]}
        dataSource={usersToCall?.data || []}
        loading={isLoading}
        pagination={{
          position: ["bottomRight"],
          current: usersToCall?.current_page || 1,
          pageSize: usersToCall?.per_page || 20,
          total: usersToCall?.total || 0,
          showSizeChanger: false,
        }}
        onChange={onTableChange}
      />
    </>
  );
}
