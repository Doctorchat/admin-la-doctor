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
import { ReactComponent as ExLink } from "../../asstets/icons/ex-link.svg";

import "./styles/index.scss";

const { TabPane } = Tabs;

export default function DoctorViewPage() {
  const { doc_id } = useParams();
  const [docInfo, setDocInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [editVisible, setEditVisible] = useState(false);
  const history = useHistory();

  const fetchDoctorInfo = useCallback(async () => {
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

  useMount(fetchDoctorInfo);

  const updateDocInfo = useCallback(
    (key, value) => {
      const newDocInfo = { ...docInfo };

      newDocInfo[key] = value;

      setDocInfo(newDocInfo);
    },
    [docInfo]
  );

  console.log(docInfo);

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
          docId={doc_id}
        />
        <DoctorViewContext.Provider value={{ docInfo, updateDocInfo }}>
          <Tabs>
            <TabPane tab="Informație generală" key="general-information">
              <GeneralInformationTab />
            </TabPane>
            <TabPane tab="Chat-uri" key="chats">
              <ChatsTab />
            </TabPane>
            {docInfo?.support_chat && (
              <TabPane
                tab={
                  <>
                    <div
                      role="tab"
                      aria-selected="false"
                      className="ant-tabs-tab-btn"
                      tabIndex="0"
                      id="rc-tabs-1-tab-support"
                      aria-controls="rc-tabs-1-panel-support"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        window.open(`/support/${docInfo.support_chat}`, "_blank").focus();
                      }}
                    >
                      <ExLink width={16} height={16} className="me-1" />
                      Support Chat
                    </div>
                  </>
                }
                key="support"
              />
            )}
          </Tabs>
        </DoctorViewContext.Provider>
      </Spin>
    </div>
  );
}
