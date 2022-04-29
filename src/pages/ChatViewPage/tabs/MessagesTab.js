import { FileOutlined, UserOutlined } from "@ant-design/icons";
import { Image, Tooltip, Comment, Avatar, Spin, Alert } from "antd";
import moment from "moment";
import { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useMount } from "react-use";
import { userRoles } from "../../../context/constants";
import api from "../../../utils/appApi";
import date from "../../../utils/date";
import documnetPlaceholder from "../../../asstets/doc.png";

const imageExts = ["png", "jpeg", "jpg", "bmp"];

const checkFileExt = (src) => {
  let file_ext = src.split(".");

  file_ext = file_ext[file_ext.length - 1];

  if (imageExts.includes(file_ext)) {
    return file_ext;
  }

  return documnetPlaceholder;
};

export default function MessageTab() {
  const { chat_id } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchChatMessages = useCallback(async () => {
    try {
      const response = await api.chats.getMessages(chat_id);
      setMessages(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [chat_id]);

  useMount(fetchChatMessages);

  if (error) {
    return (
      <Alert
        className="mt-5"
        showIcon
        type="error"
        message="Error"
        description="A apărut o eroare!"
      />
    );
  }

  return (
    <Spin spinning={loading} style={{ minHeight: 140 }}>
      {messages.map((msg) => (
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
                <Image
                  width={140}
                  key={file.id}
                  src={checkFileExt(file.src)}
                  icon={<FileOutlined />}
                />
              ))}
            </Image.PreviewGroup>
          </div>
        </Comment>
      ))}
    </Spin>
  );
}
