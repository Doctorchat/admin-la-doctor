import { FileOutlined, FileSearchOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Comment,
  Empty,
  Form,
  Image,
  Input,
  notification,
  PageHeader,
  Select,
  Spin,
  Tooltip,
  Modal,
  Dropdown,
  Menu,
} from "antd";
import moment from "moment";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [messageType, setMessageType] = React.useState("hidden");
  const queryClient = useQueryClient();
  const history = useHistory();
  const [closeChatForm] = Form.useForm();
  const [addDocForm] = Form.useForm();
  const [sendMessageForm] = Form.useForm();

  const {
    data: chatInfo,
    isLoading,
    error,
  } = useQuery(["council", chat_id], fetcher(api.council.single));

  React.useEffect(() => {
    if (error) history.push("/council-list");
  }, [error, history]);

  const sendMessageHander = React.useCallback(
    async ({ message }) => {
      setSending(true);

      let extra = {};

      if (messageType === "hidden") {
        extra.type = "hidden";
      }

      try {
        const response = await api.chats.sendMessage(chat_id, message, extra);
        const newChatInfo = { ...chatInfo };

        sendMessageForm.resetFields();
        newChatInfo.messages.push({
          id: response.data.id,
          content: message,
          user: { role: 1, name: "Service Account", id: 1 },
          uploads: [],
          avatar: "https://api2.doctorchat.md/uploads/avatars/default.png",
        });

        return Promise.resolve(newChatInfo);
      } catch (error) {
        notification.error({ message: "Erorare", description: error });
        return Promise.reject(error);
      } finally {
        setSending(false);
      }
    },
    [chatInfo, chat_id, messageType, sendMessageForm]
  );

  const mutationMessages = useMutation(sendMessageHander, {
    onSuccess: (data) => {
      queryClient.setQueryData(["council", chat_id], data);
    },
  });

  const onMessageFormSubmit = React.useCallback(
    (values) => mutationMessages.mutate(values),
    [mutationMessages]
  );

  const addDocHandler = React.useCallback(
    async ({ doctor_id }) => {
      setAddDocLoading(true);
      try {
        const response = await api.council.addMember({ user_id: doctor_id, chat_id });
        const newChatInfo = { ...chatInfo };

        addDocForm.resetFields();
        newChatInfo.doctors = response.data.doctors;

        return Promise.resolve(newChatInfo);
      } catch (error) {
        notification.error({ message: "Eroare", description: "A apărut o eroare" });
      } finally {
        setAddDocLoading(false);
      }
    },
    [addDocForm, chatInfo, chat_id]
  );

  const mutationDoctors = useMutation(addDocHandler, {
    onSuccess: (data) => {
      queryClient.setQueryData(["council", chat_id], data);
    },
  });

  const onAddDoctorFormSubmit = React.useCallback(
    (values) => mutationDoctors.mutate(values),
    [mutationDoctors]
  );

  const closeChatHandler = React.useCallback(
    async ({ message }) => {
      try {
        await api.council.close({ id: chat_id, message });
        history.push("/council-list");
        return Promise.resolve();
      } catch (error) {
        notification.error({ message: "Eroare", description: "A apărut o eroare" });
        return Promise.reject();
      }
    },
    [chat_id, history]
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const selectedDocs = React.useMemo(
    () => chatInfo?.doctors?.map((doc) => doc.id) || [],
    [chatInfo?.doctors]
  );

  const toggleMessageType = React.useCallback(
    (type) => () => {
      setMessageType(type);
      sendMessageForm.submit();
    },
    [sendMessageForm]
  );

  const menu = (
    <Menu>
      <Menu.Item key="send-to-docs" onClick={toggleMessageType("hidden")}>
        Către doctori
      </Menu.Item>
      <Menu.Item key="send-to-client" onClick={toggleMessageType("")}>
        Către client
      </Menu.Item>
    </Menu>
  );
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
              chatInfo?.messages?.map((msg) => (
                <Comment
                  key={msg.id}
                  className="chat-view-comment"
                  author={
                    <Link
                      to={
                        userRoles.get("doctor") == msg.user?.role
                          ? `/doctor/${msg.user?.id}`
                          : `/user/${msg.user?.id}`
                      }
                      className="chat-view-comment-user"
                    >
                      {msg.user?.name}
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
          {chatInfo?.status !== "closed" && (
            <div className="support-view-from">
              <Form layout="inline" onFinish={onMessageFormSubmit} form={sendMessageForm}>
                <Form.Item name="message" className="m-0 flex-grow-1">
                  <Input.TextArea autoSize placeholder="Mesajul...." />
                </Form.Item>
                <Dropdown overlay={menu} placement="topCenter" trigger="click">
                  <Button type="primary" className="ms-3" loading={sending}>
                    Trimite
                  </Button>
                </Dropdown>
              </Form>
            </div>
          )}
        </div>
        <div>
          <div className="council-user council-section">
            <Link to={`/user/${chatInfo?.user?.id}`} className="d-flex align-items-center">
              <FileSearchOutlined className="me-2" />
              {chatInfo?.user?.name}
            </Link>
          </div>
          <div className="council-doctors council-section">
            {!chatInfo?.doctors?.length && (
              <Empty description="Nu-s date" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
            {chatInfo?.doctors?.map((doctor) => (
              <div className="council-doctor" key={doctor.id}>
                <div className="doctor-avatar">
                  <Avatar
                    className="chat-view-comment-avatar"
                    src={doctor.avatar}
                    size={32}
                    icon={<UserOutlined />}
                  />
                </div>
                <div className="doctor-caption">
                  <Link to={`/doctor/${doctor.id}`}>
                    <h4 className="doctor-name">{doctor.name}</h4>
                  </Link>
                </div>
              </div>
            ))}
            {chatInfo?.status !== "closed" &&
              (chatInfo?.doctors?.length === 4 ? (
                <Button
                  type="primary"
                  danger
                  disabled={chatInfo?.status === "closed"}
                  onClick={showModal}
                  className="w-100"
                >
                  Închide Conversația
                </Button>
              ) : (
                <Form
                  layout="inline"
                  className="mt-3"
                  onFinish={onAddDoctorFormSubmit}
                  form={addDocForm}
                >
                  <Form.Item name="doctor_id">
                    <Select
                      style={{ minWidth: 170 }}
                      disabled={chatInfo?.status === "closed"}
                      options={doctors?.filter((doc) => !selectedDocs.includes(doc.value)) || []}
                      placeholder="Selecteză doctor"
                      showSearch
                    />
                  </Form.Item>
                  <Button htmlType="submit" type="primary" loading={addDocLoading}>
                    Adaugă
                  </Button>
                </Form>
              ))}

            <Modal
              title="Închide Conversația"
              visible={isModalVisible}
              onOk={closeChatForm.submit}
              onCancel={handleCancel}
              okText="Confirmă"
              cancelText="Anulează"
            >
              <Form form={closeChatForm} layout="vertical" onFinish={closeChatHandler}>
                <Form.Item
                  name="message"
                  label="Mesaj final"
                  rules={[
                    { required: true, message: "Acest câmp este obligatoriu" },
                    { min: 10, message: "Minimum 10 caractere" },
                  ]}
                >
                  <Input.TextArea autoSize={{ minRows: 3 }} />
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}
