import { PageHeader } from "antd";
import { TransactionsList } from "../../modules";
import usePermissionsRedirect from "../../hooks/usePermissionsRedirect";

export default function TransactionsPage() {
  usePermissionsRedirect();

  return (
    <>
      <PageHeader className="site-page-header" title="Tranzacții" />
      <TransactionsList />
    </>
  );
}
