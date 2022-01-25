import { PageHeader } from "antd";
import ChartLine from "../../components/Chart/ChartLine";
import { TransactionsList } from "../../modules";

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
    legend: {
      display: false,
    },
  },
};

const messagesData = {
  labels: labelsShort,
  datasets: [
    {
      backgroundColor: "#06f",
      borderColor: "#06f",
      label: "Mesaje",
      data: [3, 10, 5, 2, 20, 30, 20, 50, 40, 10, 1],
    },
  ],
};

const incomingData = {
  labels: labelsShort,
  datasets: [
    {
      backgroundColor: "#198754",
      borderColor: "#198754",
      label: "Venit",
      data: [30, 100, 50, 20, 200, 300, 200, 500, 400, 100, 10],
    },
  ],
};

export default function StatsPage() {
  return (
    <div className="stats-page">
      <PageHeader className="site-page-header" title="Statistică" />
      <ChartLine
        title="Mesaje"
        labels={labelsShort}
        data={messagesData}
        options={options}
        loading={false}
      />

      <div className="my-4" />

      <ChartLine
        title="Venit"
        labels={labelsShort}
        data={incomingData}
        options={options}
        loading={false}
      />

      <div className="my-5" />

      <TransactionsList />
    </div>
  );
}
