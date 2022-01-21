import { PageHeader, Tabs } from "antd";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatViewContext } from "./ChatViewContext";
import GeneralInformationStep from "./tabs/GeneralInformationStep";
import MessageStep from "./tabs/MessagesStep";
import SettingsStep from "./tabs/SettingsStep";

import "./styles/index.scss";

const { TabPane } = Tabs;

export default function ChatViewPage() {
  const { chat_id } = useParams();
  const [chatInfo, setChatInfo] = useState({});

  const updateChatInfo = useCallback((key, value) => {}, []);

  return (
    <>
      <PageHeader className="site-page-header" onBack={() => null} title="Chat" />
      <ChatViewContext.Provider value={{ chatInfo, updateChatInfo }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Informație generală" key="general-information">
            <GeneralInformationStep />
          </TabPane>
          <TabPane tab="Mesaje" key="messages">
            <MessageStep />
          </TabPane>
          <TabPane tab="Setări" key="settings">
            <SettingsStep />
          </TabPane>
        </Tabs>
      </ChatViewContext.Provider>
    </>
  );
}
