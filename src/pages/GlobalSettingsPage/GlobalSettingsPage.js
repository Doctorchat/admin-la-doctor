import { notification, PageHeader, Spin } from "antd";
import { useCallback, useState } from "react";
import { useMount } from "react-use";
import NotificationsTab from "./tabs/NotificationsTab";
import { GlobalSettingsContext } from "./GlobalSettingsContext";
import api from "../../utils/appApi";
import getApiErrorMessages from "../../utils/getApiErrorMessages";
import usePermissionsRedirect from "../../hooks/usePermissionsRedirect";

import "./styles/index.scss";

export default function GlobalSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState([]);

  const fetchSettings = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.settings.get();
      setSettings(response.data);
    } catch (error) {
      notification.error({ message: "Eroare", description: getApiErrorMessages(error) });
    } finally {
      setLoading(false);
    }
  }, []);

  const onSubmit = useCallback(
    ({ id: tabId }) =>
      async (values) => {
        const newSettings = [...settings];
        const updatedTab = newSettings.find((tab) => tab.id === tabId);

        updatedTab.data = { ...updatedTab.data, ...values };

        setLoading(true);

        try {
          await api.settings.update(newSettings);
        } catch (error) {
          notification.error({ message: "Eroare", description: getApiErrorMessages(error) });
        } finally {
          setLoading(false);
        }
      },
    [settings],
  );

  useMount(fetchSettings);
  usePermissionsRedirect();

  return (
    <GlobalSettingsContext.Provider
      value={{
        general: settings.length && settings[0].data,
        notifications: settings.length && settings[1].data,
        onSubmit,
      }}
    >
      <Spin spinning={loading}>
        <div className="global-settings-page">
          <PageHeader className="site-page-header" title="Setări globale" />
          <NotificationsTab />
        </div>
      </Spin>
    </GlobalSettingsContext.Provider>
  );
}
