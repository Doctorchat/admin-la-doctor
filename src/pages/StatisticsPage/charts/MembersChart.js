import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import { useDeepCompareEffect } from "react-use";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const MembersChart = ({ data }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useDeepCompareEffect(() => {
    if (data.length) {
      const labels = data.map((item) => item.month);
      const datasets = [
        {
          label: "Doctori",
          data: data.map((item) => item.doctors),
          backgroundColor: "#94a3b8",
          borderColor: "#94a3b8",
        },
        {
          label: "Utilizatori",
          data: data.map((item) => item.users),
          backgroundColor: "#61bdee",
          borderColor: "#61bdee",
        },
      ];

      setLabels(labels);
      setDatasets(datasets);
    }
  }, [data]);

  return (
    <Line
      options={{
        responsive: true,
        plugins: {
          tooltip: {
            intersect: false,
            mode: "index",
          },
          legend: {
            position: "bottom",
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
      }}
      data={{ labels, datasets }}
    />
  );
};

MembersChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string,
      doctors: PropTypes.number,
      users: PropTypes.number,
    })
  ),
};

export default MembersChart;
