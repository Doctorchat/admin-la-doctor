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

const YieldChart = ({ data }) => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  useDeepCompareEffect(() => {
    if (data.length) {
      const labels = data.map((item) => item.month);
      const datasets = [
        {
          label: "Vânzări",
          data: data.map((item) => item.sales),
          backgroundColor: "#94a3b8",
          stack: "0",
        },
        {
          label: "Profit",
          data: data.map((item) => item.profit),
          backgroundColor: "#61bdee",
          stack: "1",
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

YieldChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string,
      sales: PropTypes.number,
      profit: PropTypes.number,
    })
  ),
};

export default YieldChart;
