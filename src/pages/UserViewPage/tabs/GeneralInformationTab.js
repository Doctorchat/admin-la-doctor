import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Descriptions, Empty, Tabs, Tag } from "antd";
import date from "../../../utils/date";
import { useEffect, useState } from "react";
import InvestigationCard from "../../../components/InvestigationCard";

const { TabPane } = Tabs;

export default function GeneralInformationTab(props) {
  const { userInfo } = props;
  const [tabsPosition, setTabsPosition] = useState("left");

  const getLastSeen = () => {
    if (userInfo.isOnline) {
      return <Tag color="#06f">Online</Tag>;
    }

    return userInfo?.last_seen ? date(userInfo.last_seen).full : "Necunoscut";
  };

  useEffect(() => {
    const updateTabsPosition = () => {
      if (window.innerWidth < 721) {
        setTabsPosition("top");
      } else {
        setTabsPosition("left");
      }
    };

    window.addEventListener("resize", updateTabsPosition);

    updateTabsPosition();

    return () => window.removeEventListener("resize", updateTabsPosition);
  }, []);

  return (
    <Tabs tabPosition={tabsPosition} className="user-view-left-tabs">
      <TabPane tab="Date principale" key="user-info-main-data">
        <Descriptions
          bordered
          size="small"
          layout={tabsPosition === "top" ? "vertical" : "horizontal"}
          column={1}
          labelStyle={{ width: 180 }}
        >
          <Descriptions.Item label="Nume">{userInfo?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{userInfo?.email}</Descriptions.Item>
          <Descriptions.Item label="Telefon">{userInfo?.phone || "---"}</Descriptions.Item>
          <Descriptions.Item label="Întrebări adresate">{userInfo?.questions_count || "---"}</Descriptions.Item>
          <Descriptions.Item label="Ultima accesare">{getLastSeen()}</Descriptions.Item>
          {userInfo?.referrer && (
            <Descriptions.Item label="Invitat de">
              <Link to={`/user/${userInfo.referrer?.id}`}>{userInfo.referrer?.name}</Link>
            </Descriptions.Item>
          )}
        </Descriptions>
      </TabPane>
      <TabPane tab="Învestigări" key="user-info-investigations">
        <div className="investigations-container">
          {userInfo?.investigations?.length ? (
            userInfo.investigations.map((invg) => <InvestigationCard key={invg.id} investigation={invg} />)
          ) : (
            <Empty description="Nu-s date" />
          )}
        </div>
      </TabPane>
    </Tabs>
  );
}

GeneralInformationTab.propTypes = {
  userInfo: PropTypes.object,
};
