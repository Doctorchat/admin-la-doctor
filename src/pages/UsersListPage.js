import { PageHeader } from "antd";
import { UsersList } from "../modules";

export default function UsersListPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Utilizatori" />
      <UsersList />
    </>
  );
}
