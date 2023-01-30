import usePermissionsRedirect from "../hooks/usePermissionsRedirect";
import { InternalChatsList } from "../modules";

export default function InternalChatsListPage() {
  usePermissionsRedirect();

  return (
    <>
      <InternalChatsList />
    </>
  );
}
