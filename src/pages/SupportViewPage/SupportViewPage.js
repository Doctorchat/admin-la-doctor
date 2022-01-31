import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Comment, Image, Spin, Tooltip } from "antd";
import moment from "moment";
import { useCallback, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useMount } from "react-use";
import { userRoles } from "../../context/constants";
import api from "../../utils/appApi";
import date from "../../utils/date";

export default function SupportViewPage() {
  const { chat_id } = useParams();
  const [chatInfo, setChatInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const fetchChatInfo = useCallback(async () => {
    try {
      const response = await api.chats.getMessages(chat_id);
      setChatInfo(response.data);
    } catch (error) {
      if (history.action !== "POP") history.goBack();
      else history.push("/chats");
    } finally {
      setLoading(false);
    }
  }, [chat_id, history]);

  useMount(fetchChatInfo);

  const updateChatInfo = useCallback(
    (key, value) => {
      const newChatInfo = { ...chatInfo };

      newChatInfo[key] = value;

      setChatInfo(newChatInfo);
    },
    [chatInfo]
  );

  return (
    <Spin spinning={loading} style={{ minHeight: 140 }}>
      {chatInfo.map((msg) => (
        <Comment
          key={msg.id}
          className="chat-view-comment"
          author={
            <Link
              to={
                userRoles.get("doctor") === msg.user?.role
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
              <span className="chat-view-comment-date">{moment(msg.updated_at).fromNow()}</span>
            </Tooltip>
          }
        >
          <div className="chat-view-uploads">
            <Image.PreviewGroup>
              {msg.uploads.map((file) => (
                <Image width={140} key={file.id} src={file.src} icon={<FileOutlined />} />
              ))}
            </Image.PreviewGroup>
          </div>
        </Comment>
      ))}
    </Spin>
  );
}
