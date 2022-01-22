import { Button, Divider, Select, Typography, Form, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateChatsListRow } from "../../../store/actions/chatsListAction";
import { selectDoctorsOptions } from "../../../store/selectors/bootstrapSelectors";
import api from "../../../utils/appApi";
import { useChatViewContext } from "../ChatViewContext";

export default function SettingsTab() {
  const { updateChatInfo, chatInfo } = useChatViewContext();
  const doctors = useSelector((store) => selectDoctorsOptions(store));
  const [loadingBtns, setLoadingBtns] = useState(null);
  const [form] = Form.useForm();
  const { chat_id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (chatInfo.doctor) {
      form.setFields([{ name: "doctor_id", value: chatInfo.doctor.id }]);
    }
  }, [chatInfo.doctor, form]);

  const changeDoctorHanlder = useCallback(
    async (values) => {
      setLoadingBtns("edit_doc");

      const doctor = doctors.find((doc) => doc.value === values.doctor_id);
      const data = {
        id: doctor.value,
        name: doctor.label,
      };

      try {
        await api.chats.changeDoctor({ id: chat_id, doctor_id: data.id });

        updateChatInfo("doctor", data);

        dispatch(updateChatsListRow(+chat_id, { doctor: data }));
      } catch (error) {
        notification.error({ message: "Eroare", description: "A apărut o eraore" });
      } finally {
        setLoadingBtns(null);
      }
    },
    [chat_id, dispatch, doctors, updateChatInfo]
  );

  const closeChatHanlder = useCallback(async () => {
    setLoadingBtns("close");

    try {
      await api.chats.closeChat(chat_id);

      dispatch(updateChatsListRow(+chat_id, { status: "closed" }));
      updateChatInfo("status", "closed");
    } catch (error) {
      notification.error({ message: "Eroare", description: "A apărut o eraore" });
    } finally {
      setLoadingBtns(null);
    }
  }, [chat_id, dispatch, updateChatInfo]);

  return (
    <div className="chat-settings-tab">
      <Typography.Title level={5}>Schimă doctor-ul</Typography.Title>
      <Form form={form} layout="vertical" onFinish={changeDoctorHanlder}>
        <Form.Item name="doctor_id" label="Doctor Asignat">
          <Select disabled={chatInfo.status === "closed"} options={doctors || []} placeholder="Selecteză doctor" />
        </Form.Item>
        <Button
          htmlType="submit"
          type="primary"
          loading={loadingBtns === "edit_doc"}
          disabled={chatInfo.status === "closed"}
        >
          Editează
        </Button>
      </Form>
      <Divider />
      <Typography.Title level={5}>Închide</Typography.Title>
      <Button
        type="primary"
        danger
        loading={loadingBtns === "close"}
        disabled={chatInfo.status === "closed"}
        onClick={closeChatHanlder}
      >
        Închide Conversația
      </Button>
    </div>
  );
}
