import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useDeepCompareEffect } from "react-use";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RequestsChart = ({ data }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useDeepCompareEffect(() => {
    if (data.length) {
      const labels = data.map((item) => item.month);
      const datasets = [
        {
          label: "Noi",
          data: data.map((item) => item.requests),
          backgroundColor: "#94a3b8",
          stack: "0",
        },
        {
          label: "Repetate noi",
          data: data.map((item) => item.repeat_requests),
          backgroundColor: "#61bdee",
          stack: "0",
        },
        {
          label: "Repetate",
          data: data.map((item) => item.old_repeat_requests),
          backgroundColor: "#dc6e55",
          stack: "0",
        },
      ];

      setLabels(labels);
      setDatasets(datasets);
    }
  }, [data]);

  return (
    <Bar
      options={{
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
          callbacks: {
            footer: (tooltipItems) => {
              const total = tooltipItems.reduce(
                (acc, tooltipItem) => acc + tooltipItem.parsed.y,
                0
              );
              return `Total: ${total}`;
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      }}
      data={{ labels, datasets }}
    />
  );
};

RequestsChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string,
      requests: PropTypes.number,
      repeat_requests: PropTypes.number,
      old_repeat_requests: PropTypes.number,
    })
  ),
};

export default RequestsChart;
