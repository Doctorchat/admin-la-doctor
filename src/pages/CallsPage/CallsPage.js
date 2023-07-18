import { PageHeader, Tabs } from "antd";
import { ActiveCalls, ClosedCalls, OnholdCalls } from "./tabs";
import usePermissionsRedirect from "../../hooks/usePermissionsRedirect";

export default function CallsPage() {
  usePermissionsRedirect({ allowedRoles: [4] });

  return (
    <>
      <PageHeader title="Apeluri" className="site-page-header" />
      <Tabs
        items={[
          { key: "1", label: "În așteptare", children: <OnholdCalls /> },
          { key: "2", label: "În curs", children: <ActiveCalls /> },
          { key: "3", label: "Finisate", children: <ClosedCalls /> },
        ]}
      />
    </>
  );
}
