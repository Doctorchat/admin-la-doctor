import { PageHeader, Spin, Tabs } from "antd";
import { useCallback, useState } from "react";
import { useMount } from "react-use";
import { useParams, useHistory } from "react-router-dom";
import GeneralInformationTab from "./tabs/GeneralInformationTab";
import ChatsTab from "./tabs/ChatsTab";
import ReferralSystemTab from "./tabs/ReferralSystemTab";
import api from "../../utils/appApi";
import usePermissionsRedirect from "../../hooks/usePermissionsRedirect";

import "./styles/index.scss";

const { TabPane } = Tabs;

export default function UserViewPage() {
  usePermissionsRedirect();

  const { user_id } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const fetchUserInfo = useCallback(async () => {
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

  useMount(fetchUserInfo);

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
          <TabPane tab="Referral system" key="referral-system">
            <ReferralSystemTab />
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
}
