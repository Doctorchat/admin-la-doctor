import { Button, PageHeader, Spin, Tabs } from "antd";
import { useCallback, useState } from "react";
import { useMount } from "react-use";
import { useParams } from "react-router-dom";
import { DoctorViewContext } from "./DoctorViewContext";
import GeneralInformationTab from "./tabs/GeneralInformationTab";
import { useHistory } from "react-router-dom";
import ChatsTab from "./tabs/ChatsTab";
import cs from "../../utils/classNames";
import api from "../../utils/appApi";
import { DoctorForm } from "../../modules";

import "./styles/index.scss";

const { TabPane } = Tabs;

export default function DoctorViewPage() {
  const { doc_id } = useParams();
  const [docInfo, setDocInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const history = useHistory();

  const fetchChatInfo = useCallback(async () => {
    try {
      const response = await api.doctors.getById(doc_id);
      setDocInfo(response.data);
    } catch (error) {
      if (history.action !== "POP") history.goBack();
      else history.push("/chats");
    } finally {
      setLoading(false);
    }
  }, [doc_id, history]);

  useMount(fetchChatInfo);

  const updateDocInfo = useCallback(
    (key, value) => {
      const newDocInfo = { ...docInfo };

      newDocInfo[key] = value;

      setDocInfo(newDocInfo);
    },
    [docInfo]
  );

  return (
    <div className={cs("page-view", docInfo?.inVacation && "closed")}>
      <Spin spinning={loading}>
        <PageHeader
          className="site-page-header"
          onBack={history.goBack}
          title="Doctor"
          extra={[
            <Button
              key="doc-view-edit"
              type="primary"
              size="small"
              onClick={() => setEditVisible(true)}
            >
              Editează
            </Button>,
          ]}
        />
        <DoctorForm
          onClose={() => setEditVisible(false)}
          submitBtnText="Trimite"
          visible={editVisible}
          defaultValues={docInfo}
        />
        <DoctorViewContext.Provider value={{ docInfo, updateDocInfo }}>
          <Tabs>
            <TabPane tab="Informație generală" key="general-information">
              <GeneralInformationTab />
            </TabPane>
            <TabPane tab="Chat-uri" key="chats">
              <ChatsTab />
            </TabPane>
          </Tabs>
        </DoctorViewContext.Provider>
      </Spin>
    </div>
  );
}
