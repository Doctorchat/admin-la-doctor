import { PageHeader } from "antd";
import { WithdrawalApprovedList, WithdrawalList } from "../modules";

export default function WithdrawalPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Cereri de retragere" />
      <WithdrawalList />

      <PageHeader className="site-page-header" title="Cereri aprobate" />
      <WithdrawalApprovedList />
    </>
  );
}
