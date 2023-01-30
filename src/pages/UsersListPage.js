import usePermissionsRedirect from "../hooks/usePermissionsRedirect";
import { UsersList } from "../modules";

export default function UsersListPage() {
  usePermissionsRedirect();

  return <UsersList />;
}
