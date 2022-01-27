import { PageHeader, Spin, Tabs } from "antd";
import { useCallback, useState } from "react";
import { useMount } from "react-use";
import { useParams, useHistory } from "react-router-dom";
import GeneralInformationTab from "./tabs/GeneralInformationTab";
import ChatsTab from "./tabs/ChatsTab";
import api from "../../utils/appApi";

import "./styles/index.scss";

const { TabPane } = Tabs;

export default function UserViewPage() {
  const { user_id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const fetchChatInfo = useCallback(async () => {
    try {
      const response = await api.users.getById(user_id);
      setUserInfo(response.data);
    } catch (error) {
      if (history.action !== "POP") history.goBack();
      else history.push("/chats");
    } finally {
      setLoading(false);
    }
  }, [history, user_id]);

  useMount(fetchChatInfo);

  return (
    <div className="page-view">
      <Spin spinning={loading}>
        <PageHeader className="site-page-header" onBack={history.goBack} title="Utilizator" />
        <Tabs>
          <TabPane tab="Informație generală" key="general-information">
            <GeneralInformationTab userInfo={userInfo} />
          </TabPane>
          <TabPane tab="Chat-uri" key="chats">
            <ChatsTab />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
}
