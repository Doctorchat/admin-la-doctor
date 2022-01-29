import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { memo } from "react";
import { Spin, Typography } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartBar(props) {
  const { data, options, loading, title } = props;

  return (
    <Spin spinning={loading}>
      <Typography.Title level={5} className="text-center mb-0">
        {title}
      </Typography.Title>
      <Bar options={{ ...options }} data={data} height={85} />
    </Spin>
  );
}

ChartBar.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
  loading: PropTypes.bool,
  title: PropTypes.string,
};

export default memo(ChartBar);
