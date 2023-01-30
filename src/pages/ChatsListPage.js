import usePermissionsRedirect from "../hooks/usePermissionsRedirect";
import { ChatsList } from "../modules";

export default function ChatsListPage() {
  usePermissionsRedirect();

  return (
    <>
      <ChatsList />
    </>
  );
}
