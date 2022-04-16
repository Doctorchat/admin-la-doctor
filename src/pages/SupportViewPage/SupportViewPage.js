import { FileOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Comment,
  Image,
  Input,
  notification,
  PageHeader,
  Spin,
  Tooltip,
} from "antd";
import moment from "moment";
import { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { useMount } from "react-use";
import { userRoles } from "../../context/constants";
import { updateSupportCount } from "../../store/actions/supportListAction";
import api from "../../utils/appApi";
import date from "../../utils/date";

import "./styles/index.scss";

export default function SupportViewPage() {
  const { chat_id } = useParams();
  const [chatInfo, setChatInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(updateSupportCount());
  });

  const fetchChatInfo = useCallback(async () => {
    setLoading(true);
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

  const sendResponseHadler = useCallback(async () => {
    setSending(true);

    try {
      const response = await api.chats.sendMessage(chat_id, message);

      setChatInfo((prev) => [
        ...prev,
        {
          id: response.data.id,
          content: message,
          user: { role: 1, name: "Service Account", id: 1 },
          uploads: [],
        },
      ]);
      setMessage("");
    } catch (error) {
      notification.error({ message: "Erorare", description: error });
    } finally {
      setSending(false);
    }
  }, [chat_id, message]);

  const Title = useMemo(() => {
    if (window.location.href.includes("internal")) {
      return "Chat intern";
    }

    return "Support chat";
  }, []);

  useMount(fetchChatInfo);

  return (
    <>
      <PageHeader className="site-page-header" onBack={history.goBack} title={Title} />

      <div className="support-view-wrapper">
        <div className="support-view-container">
          <div
            className={`support-view-messages ${
              loading && "d-flex justify-content-center align-items-center"
            }`}
          >
            {loading ? (
              <Spin />
            ) : (
              chatInfo.map((msg) => (
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
            <Input.TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoSize
              placeholder="Mesajul...."
            />
            <Button
              type="primary"
              className="ms-3"
              onClick={sendResponseHadler}
              disabled={loading || sending || !message}
            >
              Trimite
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
