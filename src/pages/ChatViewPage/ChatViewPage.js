import { Badge, PageHeader, Spin, Tabs } from "antd";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatViewContext } from "./ChatViewContext";
import GeneralInformationTab from "./tabs/GeneralInformationTab";
import MessageTab from "./tabs/MessagesTab";
import SettingsTab from "./tabs/SettingsTab";
import { useMount } from "react-use";
import api from "../../utils/appApi";
import { useHistory } from "react-router-dom";
import cs from "../../utils/classNames";

import "./styles/index.scss";

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

  const getSettingsTabStatus = useCallback(() => {
    if (chatInfo.id) {
      const checks = [chatInfo.doctor.id === 1, chatInfo.isOverdue];

      if (checks.some(Boolean)) {
        return "error";
      }
    }

    return "success";
  }, [chatInfo]);

  return (
    <div className={cs("page-view", chatInfo?.status)}>
      <Spin spinning={loading}>
        <PageHeader className="site-page-header" onBack={history.goBack} title="Chat" />
        <ChatViewContext.Provider value={{ chatInfo, updateChatInfo }}>
          <Tabs
            defaultActiveKey="settings"
            items={[
              {
                key: "general-information",
                label: "Informație generală",
                children: <GeneralInformationTab />,
              },
              {
                key: "messages",
                label: "Mesaje",
                children: <MessageTab />,
              },
              {
                key: "settings",
                label: <Badge status={getSettingsTabStatus()} text="Setări" />,
                children: <SettingsTab />,
              },
            ]}
          />
        </ChatViewContext.Provider>
      </Spin>
    </div>
  );
}
