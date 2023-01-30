import { PageHeader } from "antd";
import { WithdrawalApprovedList, WithdrawalList } from "../modules";
import usePermissionsRedirect from "../hooks/usePermissionsRedirect";

export default function WithdrawalPage() {
  usePermissionsRedirect();

  return (
    <>
      <PageHeader className="site-page-header" title="Cereri de retragere" />
      <WithdrawalList />

      <PageHeader className="site-page-header" title="Cereri aprobate" />
      <WithdrawalApprovedList />
    </>
  );
}
