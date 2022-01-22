import { PageHeader, Tabs } from "antd";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { DoctorViewContext } from "./DoctorViewContext";
import GeneralInformationTab from "./tabs/GeneralInformationTab";
import { useHistory } from "react-router-dom";
import ChatsTab from "./tabs/ChatsTab";

import "./styles/index.scss";

const { TabPane } = Tabs;

export default function DoctorViewPage() {
  const { doc_id } = useParams();
  const [docInfo, setDocInfo] = useState({});
  const history = useHistory();

  const updateDocInfo = useCallback((key, value) => {}, []);

  return (
    <>
      <PageHeader className="site-page-header" onBack={history.goBack} title="Doctor" />
      <DoctorViewContext.Provider value={{ docInfo, updateDocInfo }}>
        <Tabs defaultActiveKey="general-information">
          <TabPane tab="Informație generală" key="general-information">
            <GeneralInformationTab />
          </TabPane>
          <TabPane tab="Chat-uri" key="chats">
            <ChatsTab />
          </TabPane>
        </Tabs>
      </DoctorViewContext.Provider>
    </>
  );
}
