import { Alert, Badge, Avatar, Descriptions, Empty, List, Tabs, Tag, Typography } from "antd";
import { useCallback, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMount } from "react-use";
import api from "../../../utils/appApi";
import date from "../../../utils/date";
import { useDoctorViewContext } from "../DoctorViewContext";

const daysNaming = {
  mon: { name: "Luni", ord: 1 },
  tue: { name: "Marți", ord: 2 },
  wed: { name: "Miercuri", ord: 3 },
  thu: { name: "Joi", ord: 4 },
  fri: { name: "Vineri", ord: 5 },
  sat: { name: "Sâmbătă", ord: 6 },
  sun: { name: "Duminică", ord: 7 },
};

const { TabPane } = Tabs;

export default function GeneralInformationTab() {
  const { docInfo } = useDoctorViewContext();
  const { doc_id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tabsPosition, setTabsPosition] = useState("left");

  const fetchDocReviews = useCallback(async () => {
    try {
      const response = await api.doctors.getReviews(doc_id);
      setReviews(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [doc_id]);

  useMount(fetchDocReviews);

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

  const getLastSeen = () => {
    if (docInfo.isOnline) {
      return <Tag color="#06f">Online</Tag>;
    }

    return docInfo?.last_seen ? date(docInfo.last_seen).full : "Necunoscut";
  };

  const DocDisponibility = useMemo(() => {
    const disponibility = [];

    if (docInfo?.card?.disponibility) {
      if (Array.isArray(docInfo.card.disponibility)) {
        return [];
      }

      Object.entries(docInfo.card.disponibility).forEach(([day, range]) => {
        if (range.every(Boolean)) {
          const dayConfig = daysNaming[day];
          disponibility.push({
            name: dayConfig.name,
            value: range.join(" - "),
            ord: dayConfig.ord,
          });
        }
      });

      return disponibility.sort((a, b) => a.ord - b.ord);
    }
  }, [docInfo?.card?.disponibility]);

  return (
    <Tabs tabPosition={tabsPosition} className="doc-view-left-tabs">
      <TabPane tab="Date principale" key="doc-info-main-data">
        <Descriptions
          bordered
          size="small"
          layout={tabsPosition === "top" ? "vertical" : "horizontal"}
          column={1}
          labelStyle={{ width: 180 }}
        >
          {docInfo?.card?.vacation.length && (
            <Descriptions.Item label={<Badge status="processing" text="Vacanță" />}>
              {docInfo?.card?.vacation.join(" - ")}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Nume">{docInfo?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{docInfo?.email}</Descriptions.Item>
          <Descriptions.Item label="Telefon">{docInfo?.phone || "---"}</Descriptions.Item>
          <Descriptions.Item label="Sold curent">
            {docInfo?.card?.balance ? <b>{docInfo?.card?.balance} Lei</b> : "---"}
          </Descriptions.Item>
          {docInfo?.card_regions?.map(({ public_meet_price, public_price, region_name, currency_code }) => (
            <>
              <Descriptions.Item style={{ whiteSpace: "nowrap" }} label={"Preț conferintă (" + region_name + ")"}>
                {public_meet_price} {currency_code}
              </Descriptions.Item>
              <Descriptions.Item label={"Preț mesaj (" + region_name + ")"}>
                {public_price} {currency_code}
              </Descriptions.Item>
            </>
          ))}
          <Descriptions.Item label="Disponibilitate">
            <List
              size="small"
              dataSource={DocDisponibility}
              locale={{
                emptyText: <Empty description="Nu-s date" className="p-0" />,
              }}
              renderItem={(item) => (
                <List.Item>
                  {item.name}: {item.value}
                </List.Item>
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Participă în program corporativ">
            {docInfo?.card?.companies_program ? <b>Da</b> : "Nu"}
          </Descriptions.Item>
          {docInfo?.card?.companies_program && (
            <Descriptions.Item label="Prețul conversației în program corporativ">
              {docInfo?.card?.companies_price} MDL
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Ultima accesare">{getLastSeen()}</Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Activitate" key="doc-info-acitvity">
        <Descriptions
          bordered
          size="small"
          layout={tabsPosition === "top" ? "vertical" : "horizontal"}
          column={1}
          labelStyle={{ width: 180 }}
        >
          <Descriptions.Item label="Oameni ajutați">{docInfo?.card?.helped}</Descriptions.Item>
          <Descriptions.Item label="Utilizatori mulțumiți">{`Likes: ${docInfo?.card?.likes?.like} | Dislikes: ${docInfo?.card?.likes?.dislike}`}</Descriptions.Item>
          <Descriptions.Item label="Timp de răspuns">{docInfo?.card?.response_time}</Descriptions.Item>
          <Descriptions.Item label="Locul de muncă">{docInfo?.card?.workplace}</Descriptions.Item>
          <Descriptions.Item label="Educație">
            <List
              size="small"
              dataSource={docInfo?.card?.studies?.length ? docInfo?.card?.studies : []}
              rowKey={(item) => item}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Despre" key="doc-info-about">
        <Descriptions
          bordered
          size="small"
          layout={tabsPosition === "top" ? "vertical" : "horizontal"}
          column={1}
          labelStyle={{ width: 180 }}
        >
          <Descriptions.Item label="Ani experientă">{docInfo?.card?.experience}</Descriptions.Item>
          <Descriptions.Item label="Titlul Profesional">{docInfo?.card?.title}</Descriptions.Item>
          <Descriptions.Item label="Specializare">{docInfo?.card?.specialization.ro}</Descriptions.Item>
          <Descriptions.Item label="Specialitate">
            <List
              size="small"
              dataSource={docInfo?.card?.speciality || []}
              renderItem={(item) => <List.Item>{item.name_ro}</List.Item>}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Despre">
            <Typography.Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "Vezi mai mult" }}>
              {docInfo?.card?.bio.ro}
            </Typography.Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Recenzii" key="doc-info-reviews">
        {error ? (
          <Alert showIcon type="error" message="Error" description="A apărut o eroare!" />
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={reviews?.data || []}
            loading={loading}
            locale={{
              emptyText: <Empty description="Nu-s date" />,
            }}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={<Link to={`/user/${item.user.id}`}>{item.user.name}</Link>}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        )}
      </TabPane>
    </Tabs>
  );
}
