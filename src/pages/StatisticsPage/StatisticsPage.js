import { Card, Col, Divider, PageHeader, Row, Statistic, Tabs, Typography } from "antd";
import { useQuery } from "react-query";
import api from "../../utils/appApi";
import { MembersChart, RequestsChart, YieldChart } from "./charts";
import usePermissionsRedirect from "../../hooks/usePermissionsRedirect";

const StatisticsPage = () => {
  const { data: statistics, isLoading } = useQuery(["statistics"], () => api.stats.getStatistics(), {
    refetchOnWindowFocus: false,
  });

  usePermissionsRedirect();

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
            <Statistic title="Număr de utilizatori" value={statistics?.general?.usersCount} precision={0} />
          </Card>
        </Col>
      </Row>

      {!isLoading && (
        <Tabs
          type="card"
          size="large"
          items={Object.entries(statistics.regions).map(([key, value], i) => {
            return {
              label: key,
              key,
              children: <StaticsCharts data={value.year} />,
            };
          })}
        />
      )}
    </div>
  );
};

export default StatisticsPage;

const StaticsCharts = ({ data }) => {
  return (
    <>
      <YieldChart data={data} />
      <Divider orientation="left" className="mt-5">
        <Typography.Title level={5} className="mb-0">
          Cereri pe lună
        </Typography.Title>
      </Divider>
      <RequestsChart data={data} />
      <Divider orientation="left" className="mt-5">
        <Typography.Title level={5} className="mb-0">
          Utilizatori și Doctori
        </Typography.Title>
      </Divider>
      <MembersChart data={data} />
    </>
  );
};
