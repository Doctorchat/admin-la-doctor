import { PageHeader } from "antd";
import { ChatsList } from "../modules";

export default function ChatsListPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Chat-uri" />
      <ChatsList />
    </>
  );
}
