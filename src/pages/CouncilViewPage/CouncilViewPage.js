import { FileOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Comment,
  Empty,
  Form,
  Image,
  Input,
  PageHeader,
  Select,
  Spin,
  Tooltip,
} from "antd";
import moment from "moment";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { userRoles } from "../../context/constants";
import { selectDoctorsOptions } from "../../store/selectors/bootstrapSelectors";
import api from "../../utils/appApi";
import date from "../../utils/date";
import fetcher from "../../utils/fetcher";

import "./styles/index.scss";

export default function CouncilViewPage() {
  const { chat_id } = useParams();
  const { doctors } = useSelector((store) => ({ doctors: selectDoctorsOptions(store) }));
  const [addDocLoading, setAddDocLoading] = React.useState(false);
  const queryClient = useQueryClient();
  const history = useHistory();

  const {
    data: chatInfo,
    isLoading,
    error,
  } = useQuery(["council", chat_id], fetcher(api.support.get));

  React.useEffect(() => {
    if (error) history.push("/council-list");
  }, [error, history]);

  const sendMessageHander = React.useCallback(({ message }) => {
    console.log(message);
  }, []);

  const addDocHandler = React.useCallback(({ doctor_id }) => {
    console.log(doctor_id);
  }, []);

  return (
    <>
      <PageHeader className="site-page-header" onBack={history.goBack} title="Consiliu" />

      <div className="support-view-wrapper council-view">
        <div className="support-view-container">
          <div
            className={`support-view-messages ${
              isLoading && "d-flex justify-content-center align-items-center"
            }`}
          >
            {isLoading ? (
              <Spin />
            ) : (
              [].map((msg) => (
                <Comment
                  key={msg.id}
                  className="chat-view-comment"
                  author={
                    <Link
                      to={
                        userRoles.get("doctor") == msg.user?.role
                          ? `/doctor/${msg.user.id}`
                          : `/user/${msg.user.id}`
                      }
                      className="chat-view-comment-user"
                    >
                      {msg.user.name}
                    </Link>
                  }
                  avatar={
                    <Avatar
                      className="chat-view-comment-avatar"
                      src={msg.avatar}
                      size={48}
                      icon={<UserOutlined />}
                    />
                  }
                  content={<p>{msg.content}</p>}
                  datetime={
                    <Tooltip title={date(msg.updated_at).full}>
                      <span className="chat-view-comment-date">
                        {moment(msg.updated_at).fromNow()}
                      </span>
                    </Tooltip>
                  }
                >
                  <div className="chat-view-uploads">
                    <Image.PreviewGroup>
                      {msg?.uploads?.map((file) => (
                        <Image width={140} key={file.id} src={file.src} icon={<FileOutlined />} />
                      ))}
                    </Image.PreviewGroup>
                  </div>
                </Comment>
              ))
            )}
          </div>
          <div className="support-view-from">
            <Form layout="inline" onFinish={sendMessageHander}>
              <Form.Item name="message" className="m-0 flex-grow-1">
                <Input.TextArea autoSize placeholder="Mesajul...." />
              </Form.Item>
              <Button type="primary" className="ms-3">
                Trimite
              </Button>
            </Form>
          </div>
        </div>
        <div className="council-doctors">
          <Empty description="Nu-s date" image={Empty.PRESENTED_IMAGE_SIMPLE} />
          {[].map((doctor) => (
            <div className="council-doctor" key={doctor.id}>
              <div className="doctor-avatar">
                <Avatar
                  className="chat-view-comment-avatar"
                  src={doctor.avatar}
                  size={48}
                  icon={<UserOutlined />}
                />
              </div>
              <div className="doctor-caption">
                <h4 className="doctor-name">{doctor.name}</h4>
                <p className="doctor-category">{doctor.category.join(", ")}</p>
              </div>
            </div>
          ))}
          <Form layout="inline" onFinish={addDocHandler}>
            <Form.Item name="doctor_id">
              <Select
                style={{ minWidth: 170 }}
                disabled={chatInfo.status === "closed"}
                options={doctors || []}
                placeholder="Selecteză doctor"
              />
            </Form.Item>
            <Button htmlType="submit" type="primary" loading={addDocLoading}>
              Adaugă
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}
