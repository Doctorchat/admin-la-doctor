import React from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, Card, Col, Row, Statistic } from "antd";
import { DcTable } from "../../../components";
import api from "../../../utils/appApi";
import date from "../../../utils/date";
import { useQuery } from "react-query";
import { useSessionStorage } from "react-use";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

export default function ReferralSystemTab() {
  const { user_id } = useParams();

  const [state, setState] = useSessionStorage("referral-system", initialState);

  const { data, isLoading, error } = useQuery(
    ["referral-system", user_id, state],
    () => api.user.referrals(user_id, state),
    { enabled: !!user_id }
  );

  const onTableChange = React.useCallback(
    (pagination) => {
      const newState = { ...state };

      newState.page = pagination.current;

      setState(newState);
    },
    [setState, state]
  );

  const columns = React.useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
      },
      {
        title: "Nume",
        dataIndex: "name",
        render: (_, { id, name }) => <Link to={`/user/${id}`}>{name}</Link>,
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Creat",
        dataIndex: "created_at",
        render: (rowData) => date(rowData).full,
      },
    ],
    []
  );

  if (error) {
    return <Alert className="mt-5" showIcon type="error" message="Error" description="A apărut o eroare!" />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card className="rounded">
          <Statistic title="Câștigat" loading={isLoading} value={data?.earned} precision={2} suffix={data?.currency} />
        </Card>
      </Col>
      <Col span={8}>
        <Card className="rounded">
          <Statistic title="Nr. Referali" loading={isLoading} value={data?.referrals?.total ?? 0} />
        </Card>
      </Col>
      <Col span={24}>
        <DcTable
          dataColumns={columns}
          dataSource={data?.referrals?.data}
          loading={isLoading}
          onTabelChange={onTableChange}
          pagination={{
            position: ["bottomRight"],
            per_page: data?.referrals?.per_page,
            total: data?.referrals?.total,
            current_page: data?.referrals?.current_page,
          }}
        />
      </Col>
    </Row>
  );
}
