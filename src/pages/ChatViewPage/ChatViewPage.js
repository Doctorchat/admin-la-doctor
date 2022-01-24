import { PageHeader, Spin, Tabs } from "antd";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatViewContext } from "./ChatViewContext";
import GeneralInformationTab from "./tabs/GeneralInformationTab";
import MessageTab from "./tabs/MessagesTab";
import SettingsTab from "./tabs/SettingsTab";

import "./styles/index.scss";
import { useMount } from "react-use";
import api from "../../utils/appApi";
import { useHistory } from "react-router-dom";
import cs from "../../utils/classNames";

const { TabPane } = Tabs;

export default function ChatViewPage() {
  const { chat_id } = useParams();
  const [chatInfo, setChatInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchChatInfo = useCallback(async () => {
    try {
      const response = await api.chats.getById(chat_id);
      setChatInfo(response.data);
    } catch (error) {
      if (history.action !== "POP") history.goBack();
      else history.push("/chats");
    } finally {
      setLoading(false);
    }
  }, [chat_id, history]);

  useMount(fetchChatInfo);

  const updateChatInfo = useCallback(
    (key, value) => {
      const newChatInfo = { ...chatInfo };

      newChatInfo[key] = value;

      setChatInfo(newChatInfo);
    },
    [chatInfo]
  );

  return (
    <div className={cs("page-view", chatInfo?.status)}>
      <Spin spinning={loading}>
        <PageHeader className="site-page-header" onBack={history.goBack} title="Chat" />
        <ChatViewContext.Provider value={{ chatInfo, updateChatInfo }}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Informație generală" key="general-information">
              <GeneralInformationTab />
            </TabPane>
            <TabPane tab="Mesaje" key="messages">
              <MessageTab />
            </TabPane>
            <TabPane tab="Setări" key="settings">
              <SettingsTab />
            </TabPane>
          </Tabs>
        </ChatViewContext.Provider>
      </Spin>
    </div>
  );
}
