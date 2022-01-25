import { PageHeader, Spin, Tabs } from "antd";
import { useState } from "react";
import GeneralDataTab from "./tabs/GeneralDataTab";
import NotificationsTab from "./tabs/NotificationsTab";

import "./styles/index.scss";

const { TabPane } = Tabs;

export default function GlobalSettingsPage() {
  const [loading, setLoading] = useState(false);

  return (
    <Spin spinning={loading}>
      <div className="global-settings-page">
        <PageHeader className="site-page-header" title="Setări globale" />
        <Tabs>
          <TabPane tab="Setări generale" key="general-data" className="px-1">
            <GeneralDataTab />
          </TabPane>
          <TabPane tab="Mesaje de notificare" key="notification-messages">
            <NotificationsTab />
          </TabPane>
        </Tabs>
      </div>
    </Spin>
  );
}
