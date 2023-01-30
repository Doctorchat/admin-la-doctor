import usePermissionsRedirect from "../hooks/usePermissionsRedirect";
import { CouncilList } from "../modules";

export default function CouncilListPage() {
  usePermissionsRedirect();

  return (
    <>
      <CouncilList />
    </>
  );
}
