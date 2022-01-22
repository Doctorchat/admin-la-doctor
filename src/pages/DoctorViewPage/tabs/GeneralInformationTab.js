import { Badge, Descriptions, Empty, List, Tabs, Tag, Typography } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import { Link } from "react-router-dom";
import date from "../../../utils/date";
import { useDoctorViewContext } from "../DoctorViewContext";

const { TabPane } = Tabs;

export default function GeneralInformationTab() {
  const { docInfo, updateDocInfo } = useDoctorViewContext();

  const getLastSeen = () => {
    if (docInfo.isOnline) {
      return <Tag color="#06f">Online</Tag>;
    }

    return docInfo ? date(docInfo.last_seen).dynamic() : "Necunoscut";
  };

  return (
    <Tabs defaultActiveKey="doc-info-main-data" tabPosition="left" className="doc-view-left-tabs">
      <TabPane tab="Date principale" key="doc-info-main-data">
        <Descriptions
          bordered
          size="small"
          layout="horizontal"
          column={1}
          labelStyle={{ width: 180 }}
        >
          <Descriptions.Item label={<Badge status="processing" text="Vacanță" />}>
            13.01.2022 - 18.01.2022
          </Descriptions.Item>
          <Descriptions.Item label="Nume">3</Descriptions.Item>
          <Descriptions.Item label="Email">3</Descriptions.Item>
          <Descriptions.Item label="Telefon">13</Descriptions.Item>
          <Descriptions.Item label="Preț conferintă">230</Descriptions.Item>
          <Descriptions.Item label="Preț mesaj">3</Descriptions.Item>
          <Descriptions.Item label="Disponibilitate">
            <List
              size="small"
              dataSource={[
                { day: "Luni", range: "14:30 - 18:00" },
                { day: "Miercuri", range: "13:30 - 18:00" },
              ]}
              renderItem={(item) => (
                <List.Item>
                  {item.day}: {item.range}
                </List.Item>
              )}
            />
          </Descriptions.Item>
          <Descriptions.Item label="Ultima accesare">{getLastSeen()}</Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Activitate" key="doc-info-acitvity">
        <Descriptions
          bordered
          size="small"
          layout="horizontal"
          column={1}
          labelStyle={{ width: 180 }}
        >
          <Descriptions.Item label="Oameni ajutați">3</Descriptions.Item>
          <Descriptions.Item label="Utilizatori mulțumiți">3</Descriptions.Item>
          <Descriptions.Item label="Recenzii">13</Descriptions.Item>
          <Descriptions.Item label="Timp de răspuns">35 min</Descriptions.Item>
          <Descriptions.Item label="Locul de muncă">John Doe</Descriptions.Item>
          <Descriptions.Item label="Educație">
            <List
              size="small"
              dataSource={["Item #1", "Item #2"]}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Despre" key="doc-info-about">
        <Descriptions
          bordered
          size="small"
          layout="horizontal"
          column={1}
          labelStyle={{ width: 180 }}
        >
          <Descriptions.Item label="Ani experientă">3</Descriptions.Item>
          <Descriptions.Item label="Titlul Profesional">3</Descriptions.Item>
          <Descriptions.Item label="Specializare">13</Descriptions.Item>
          <Descriptions.Item label="Despre">
            <Typography.Paragraph ellipsis={{ rows: 3, expandable: true, symbol: "Vezi mai mult" }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Typography.Paragraph>
          </Descriptions.Item>
        </Descriptions>
      </TabPane>
      <TabPane tab="Recenzii" key="doc-info-reviews">
        <List
          itemLayout="horizontal"
          dataSource={[]}
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
      </TabPane>
    </Tabs>
  );
}
