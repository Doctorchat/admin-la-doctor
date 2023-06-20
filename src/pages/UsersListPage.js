import usePermissionsRedirect from "../hooks/usePermissionsRedirect";
import { UsersList } from "../modules";

export default function UsersListPage() {
  usePermissionsRedirect({ allowedRoles: [5] });

  return <UsersList />;
}
