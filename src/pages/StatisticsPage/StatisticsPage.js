import { Card, Col, Divider, PageHeader, Row, Statistic, Typography } from "antd";
import { useQuery } from "react-query";
import api from "../../utils/appApi";
import { MembersChart, RequestsChart, YieldChart } from "./charts";

const StatisticsPage = () => {
  const { data: statistics } = useQuery(["statistics"], () => api.stats.getStatistics(), {
    refetchOnWindowFocus: false,
  });

  return (
    <div className="stats-page">
      <PageHeader className="site-page-header" title="Statistică" />

      <Row gutter={[24, 24]} className="mb-4">
        <Col span={12} md={8}>
          <Card className="rounded">
            <Statistic
              title="Balanța doctorilor"
              value={statistics?.general?.doctorsBalance}
              precision={2}
              suffix="MDL"
            />
          </Card>
        </Col>
        <Col span={12} md={8}>
          <Card className="rounded">
            <Statistic
              title="Balanța utilizatorilor"
              value={statistics?.general?.usersBalance}
              precision={2}
              suffix="MDL"
            />
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card className="rounded">
            <Statistic
              title="Număr de utilizatori"
              value={statistics?.general?.usersCount}
              precision={0}
            />
          </Card>
        </Col>
      </Row>

      <YieldChart data={statistics?.year ?? []} />

      <Divider orientation="left" className="mt-5">
        <Typography.Title level={5} className="mb-0">
          Cereri pe lună
        </Typography.Title>
      </Divider>
      <RequestsChart data={statistics?.year ?? []} />

      <Divider orientation="left" className="mt-5">
        <Typography.Title level={5} className="mb-0">
          Utilizatori și Doctori
        </Typography.Title>
      </Divider>
      <MembersChart data={statistics?.year ?? []} />
    </div>
  );
};

export default StatisticsPage;
