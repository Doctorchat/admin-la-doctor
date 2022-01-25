import { PageHeader, Spin, Tabs } from "antd";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import GeneralInformationTab from "./tabs/GeneralInformationTab";
import api from "../../utils/appApi";

import "./styles/index.scss";

const { TabPane } = Tabs;

export default function UserViewPage() {
  const { user_id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

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
  }, [user_id]);

  return (
    <div className="page-view">
      <Spin spinning={loading}>
        <PageHeader className="site-page-header" onBack={history.goBack} title="Utilizator" />
        <Tabs>
          <TabPane tab="Informație generală" key="general-information">
            <GeneralInformationTab userInfo={userInfo} />
          </TabPane>
          <TabPane tab="Chat-uri" key="chats">
            {/* <ChatsTab /> */}
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
}
