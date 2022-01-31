import { PageHeader } from "antd";
import { SupportList } from "../modules";

export default function SupportListPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Support Chat-uri" />
      <SupportList />
    </>
  );
}
