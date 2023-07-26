import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Divider,
  Modal,
  PageHeader,
  Row,
  Statistic,
  Table,
  Tabs,
  Typography,
  notification,
} from "antd";
import { useQuery } from "react-query";
import useTableState from "../hooks/usePaginatedQueryState";
import api from "../utils/appApi";
import { useCallback } from "react";
import { useState } from "react";
import { CompanyForm } from "../modules";

export default function CompanyViewPage() {
  const history = useHistory();

  const [isCompanyFormOpen, setIsCompanyFormOpen] = useState(false);

  const { company_id } = useParams();
  const { page, sortColumn, sortDirection, onTableChange } = useTableState("company-employees");
  const {
    data: company,
    isLoading: isCompanyLoading,
    refetch,
  } = useQuery(["company", company_id], () => api.companies.get(company_id), {
    enabled: !!company_id,
    onError: () => {
      history.replace("/companies");
    },
    retry: false,
  });
  const { data: employees, isLoading: areEmployeesLoading } = useQuery(
    ["company-employees", company_id, page, sortColumn, sortDirection],
    () =>
      api.companies.employees(company_id, {
        company_id,
        page,
        sort_column: sortColumn,
        sort_direction: sortDirection === "ascend" ? "asc" : "desc",
      }),
    { enabled: !!company_id }
  );

  const onDeleteCompany = useCallback(() => {
    Modal.confirm({
      title: "Șterge compania",
      content: "Ești sigur că vrei să ștergi compania?",
      async onOk() {
        try {
          await api.companies.delete(company_id);
          history.replace("/companies");
          notification.success({
            message: "Compania a fost ștearsă cu succes",
          });
        } catch (error) {
          notification.error({
            message: "Eroare",
            description: error.message,
          });
        }
      },
      okText: "Da",
      cancelText: "Nu",
    });
  }, [company_id, history]);

  return (
    <>
      <PageHeader className="site-page-header" onBack={history.goBack} title={`Comanie - ${company?.name || ""}`} />

      {isCompanyFormOpen && (
        <CompanyForm
          open={isCompanyFormOpen}
          onClose={() => setIsCompanyFormOpen(false)}
          defaultValues={company}
          onSubmitSuccess={refetch}
        />
      )}

      <Tabs>
        <Tabs.TabPane tab="Detalii" key="details">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card className="rounded">
                <Statistic
                  title="Sold curent"
                  loading={isCompanyLoading}
                  value={company?.balance}
                  precision={2}
                  suffix="MDL"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card className="rounded">
                <Statistic title="Nr. Angajați" loading={isCompanyLoading} value={employees?.total ?? 0} />
              </Card>
            </Col>
            <Col span={24}>
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
                    render: (name, record) => <Link to={`/user/${record.id}`}>{name}</Link>,
                  },
                  {
                    title: "Nr. telefon",
                    dataIndex: "phone",
                  },
                  {
                    title: "Status",
                    dataIndex: "is_verified_by_company",
                    render: (isVerified) => (isVerified ? "Verificat" : "Ne verificat"),
                  },
                ]}
                dataSource={employees?.data || []}
                loading={areEmployeesLoading}
                pagination={{
                  position: ["bottomRight"],
                  current: employees?.current_page || 1,
                  pageSize: employees?.per_page || 20,
                  total: employees?.total || 0,
                  showSizeChanger: false,
                  hideOnSinglePage: true,
                }}
                onChange={onTableChange}
              />
            </Col>
          </Row>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Setări" key="settings">
          <Typography.Title level={5}>Editează</Typography.Title>
          <Button type="primary" onClick={() => setIsCompanyFormOpen(true)}>
            Editează compania
          </Button>

          <Divider />

          <Typography.Title level={5}>Închide</Typography.Title>
          <Button type="primary" danger onClick={onDeleteCompany}>
            Șterge compania
          </Button>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
}
