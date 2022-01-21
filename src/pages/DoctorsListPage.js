import { PageHeader } from "antd";
import { DoctorsList } from "../modules";

export default function ChatsListPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Doctori" />
      <DoctorsList />
    </>
  );
}
