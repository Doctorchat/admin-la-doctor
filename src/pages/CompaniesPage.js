import { useState } from "react";
import { Button, PageHeader, Table } from "antd";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";

import { CompanyForm } from "../modules";
import usePermissionsRedirect from "../hooks/usePermissionsRedirect";
import useTableState from "../hooks/usePaginatedQueryState";
import api from "../utils/appApi";

export default function CompaniesPage() {
  usePermissionsRedirect();

  const history = useHistory();

  const { page, sortColumn, sortDirection, onTableChange } = useTableState("companies");
  const {
    data: companies,
    isLoading,
    refetch,
  } = useQuery(["companies", page, sortColumn, sortDirection], () =>
    api.companies.list({
      page,
      sort_column: sortColumn,
      sort_direction: sortDirection === "ascend" ? "asc" : "desc",
    })
  );

  const [isCompanyFormOpen, setIsCompanyFormOpen] = useState(false);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={`Companii (${companies?.total || 0})`}
        extra={[
          <Button key="create-company" type="primary" onClick={() => setIsCompanyFormOpen(true)}>
            Creaza o companie
          </Button>,
        ]}
      />

      {isCompanyFormOpen && (
        <CompanyForm open={isCompanyFormOpen} onClose={() => setIsCompanyFormOpen(false)} onSubmitSuccess={refetch} />
      )}

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
            title: "Nr. de contact",
            dataIndex: "phone",
            render: (phone) => phone || "N/A",
          },
          {
            title: "Acțiuni",
            width: 100,
            render: (_, record) => (
              <Button type="primary" size="small" onClick={() => history.push(`/company/${record.id}`)}>
                Vezi compania
              </Button>
            ),
          },
        ]}
        dataSource={companies?.data || []}
        loading={isLoading}
        pagination={{
          position: ["bottomRight"],
          current: companies?.current_page || 1,
          pageSize: companies?.per_page || 20,
          total: companies?.total || 0,
          showSizeChanger: false,
        }}
        onChange={onTableChange}
      />
    </>
  );
}
