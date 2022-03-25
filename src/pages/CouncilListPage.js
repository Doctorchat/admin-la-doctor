import { PageHeader } from "antd";
import { CouncilList } from "../modules";

export default function CouncilListPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Lista de consilii" />
      <CouncilList />
    </>
  );
}
