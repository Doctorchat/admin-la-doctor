import PropTypes from "prop-types";
import { Descriptions, Tabs, Tag } from "antd";
import date from "../../../utils/date";
import { useEffect, useState } from "react";

const { TabPane } = Tabs;

export default function GeneralInformationTab(props) {
  const { userInfo } = props;
  const [tabsPosition, setTabsPosition] = useState("left");

  const getLastSeen = () => {
    if (userInfo.isOnline) {
      return <Tag color="#06f">Online</Tag>;
    }

    return userInfo?.last_seen ? date(userInfo.last_seen).dynamic() : "Necunoscut";
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
          <Descriptions.Item label="Întrebări adresate">
            {userInfo?.questions_count || "---"}
          </Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Învestigări" key="user-info-investigations">
        <div className="investigations-container">
          <div className="investigation-card">
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Nume</div>
                <div className="property__description">Novac Denis</div>
              </div>
              <div className="investigation-card__property">
                <div className="property__title">Gen</div>
                <div className="property__description">Masculin</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Vârsta</div>
                <div className="property__description">21</div>
              </div>
              <div className="investigation-card__property">
                <div className="property__title">Înălțime(cm)</div>
                <div className="property__description">185</div>
              </div>
              <div className="investigation-card__property">
                <div className="property__title">Greutate(kg)</div>
                <div className="property__description">68</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Gen de activitate</div>
                <div className="property__description">Regim activ de viata, lucru la stroica.</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Datele epidemiologice</div>
                <div className="property__description">Nu am suportat</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Specificații</div>
                <div className="property__description">
                  NLorem Ipsum is simply dummy text of the printing and typesetting industry.
                </div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Boli suportate</div>
                <div className="property__description">Traumatizme</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Specificații</div>
                <div className="property__description">
                  NLorem Ipsum is simply dummy text of the printing and typesetting industry.
                </div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Alergii</div>
                <div className="property__description">Polen</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Specificații</div>
                <div className="property__description">
                  NLorem Ipsum is simply dummy text of the printing and typesetting industry.
                </div>
              </div>
            </div>
          </div>
          <div className="investigation-card">
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Nume</div>
                <div className="property__description">Novac Denis</div>
              </div>
              <div className="investigation-card__property">
                <div className="property__title">Gen</div>
                <div className="property__description">Masculin</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Vârsta</div>
                <div className="property__description">21</div>
              </div>
              <div className="investigation-card__property">
                <div className="property__title">Înălțime(cm)</div>
                <div className="property__description">185</div>
              </div>
              <div className="investigation-card__property">
                <div className="property__title">Greutate(kg)</div>
                <div className="property__description">68</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Gen de activitate</div>
                <div className="property__description">Regim activ de viata, lucru la stroica.</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Datele epidemiologice</div>
                <div className="property__description">Nu am suportat</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Specificații</div>
                <div className="property__description">
                  NLorem Ipsum is simply dummy text of the printing and typesetting industry.
                </div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Boli suportate</div>
                <div className="property__description">Traumatizme</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Specificații</div>
                <div className="property__description">
                  NLorem Ipsum is simply dummy text of the printing and typesetting industry.
                </div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Alergii</div>
                <div className="property__description">Polen</div>
              </div>
            </div>
            <div className="investigation-card__block">
              <div className="investigation-card__property">
                <div className="property__title">Specificații</div>
                <div className="property__description">
                  NLorem Ipsum is simply dummy text of the printing and typesetting industry.
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPane>
    </Tabs>
  );
}

GeneralInformationTab.propTypes = {
  userInfo: PropTypes.object,
};
