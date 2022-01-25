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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { memo } from "react";
import { Spin, Typography } from "antd";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ChartLine(props) {
  const { data, options, loading, title } = props;

  return (
    <Spin spinning={loading}>
      <Typography.Title level={5} className="text-center mb-0">{title}</Typography.Title>
      <Line
        options={{...options,}}
        data={data}
        height={85}
      />
    </Spin>
  );
}

ChartLine.propTypes = {
  data: PropTypes.object,
  options: PropTypes.object,
  loading: PropTypes.bool,
  title: PropTypes.string,
};

export default memo(ChartLine);
