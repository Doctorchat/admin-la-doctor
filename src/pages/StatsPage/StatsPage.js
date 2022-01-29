import { PageHeader } from "antd";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount } from "react-use";
import ChartBar from "../../components/Chart/ChartBar";
import { TransactionsList } from "../../modules";
import { getStatsCharts } from "../../store/actions/statsAction";

const labelsLong = {
  Ian: "Ianuarie",
  Feb: "Februarie",
  Mart: "Martie",
  Apr: "Aprilie",
  Mai: "Mai",
  Iun: "Iunie",
  Iul: "Iulie",
  Aug: "August",
  Sept: "Septembrie",
  Oct: "Octombrie",
  Dec: "Decembrie",
};
const labelsShort = ["Ian", "Feb", "Mart", "Apr", "Mai", "Iun", "Iul", "Aug", "Sept", "Oct", "Dec"];

// const data = [3, 10, 5, 2, 20, 30, 20, 50, 40, 10, 1];

const options = {
  responsive: true,
  plugins: {
    tooltip: {
      caretPadding: 6,
      callbacks: {
        title: (ctx) => labelsLong[ctx[0].label],
      },
    },
    // legend: {
    //   display: false,
    // },
  },
};

export default function StatsPage() {
  const { charts } = useSelector((store) => ({
    charts: store.stats.charts,
  }));
  const [chartsData, setChartsData] = useState({ messages: [], revenue: [] });
  const [chartsLoading, setChartsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const messagesData = [];
    const revenueData = [];

    const currentYear = moment().year();

    if (charts && charts[currentYear]) {
      const chartForYear = Object.values(charts[currentYear]).map((monthData) =>
        Object.values(monthData)
      );

      const monthsOffset = moment().month();

      for (let i = 0; i <= monthsOffset; i++) {
        revenueData.push(chartForYear[i][0]);
        messagesData.push(chartForYear[i][1]);
      }
    }

    setChartsData({ messages: messagesData, revenue: revenueData });
  }, [charts]);

  useMount(async () => {
    setChartsLoading(true);
    await dispatch(getStatsCharts());
    setChartsLoading(false);
  });

  const messagesDataset = useMemo(
    () => ({
      labels: labelsShort,
      datasets: [
        {
          backgroundColor: "#06f",
          borderColor: "#06f",
          label: "Mesaje",
          data: chartsData.messages,
        },
        {
          backgroundColor: "#198754",
          borderColor: "#198754",
          label: "Venit",
          data: chartsData.revenue,
        },
      ],
    }),
    [chartsData.messages, chartsData.revenue]
  );

  return (
    <div className="stats-page">
      <PageHeader className="site-page-header" title="Statistică" />
      <ChartBar
        title="Doctorchat Statistică"
        labels={labelsShort}
        data={messagesDataset}
        options={options}
        loading={chartsLoading}
      />

      <div className="my-5" />

      <TransactionsList />
    </div>
  );
}
