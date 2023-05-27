import { PageHeader } from "antd";
import { BoughtList } from "../modules";
import usePermissionsRedirect from "../hooks/usePermissionsRedirect";

export default function BoughtPage() {
  usePermissionsRedirect();

  return (
    <>
      <PageHeader className="site-page-header" title="Serviciu achizitional" />
      <BoughtList />
    </>
  );
}
