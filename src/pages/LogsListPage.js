import { PageHeader } from "antd";
import { LogsList } from "../modules";

export default function ReviewsListPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Istoricul" />
      <LogsList />
    </>
  );
}
