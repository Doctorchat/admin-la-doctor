import { PageHeader } from "antd";
import { TransactionsList } from "../../modules";

export default function TransactionsPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Tranzacții" />
      <TransactionsList />
    </>
  );
}
