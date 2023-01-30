import { Alert, Button, Descriptions, Form, Input, Modal, Select, notification } from "antd";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";

import api from "../../../utils/appApi";
import useApiErrorsWithAntd from "../../../hooks/useApiErrorsWithAntd";
import { useQuery } from "react-query";

export default function UserDetails({ user, onClose }) {
  const [form] = Form.useForm();
  const { setApiErrorsToAntdForm } = useApiErrorsWithAntd(form);
  const globalErrors = form.getFieldError("global");

  const [loading, setLoading] = useState(false);

  const { data: sources, isLoading } = useQuery(["calls-sources"], () => api.calls.sources(), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const onCompleteCall = useCallback(
    async (values) => {
      setLoading(true);

      const data = {
        ...values,
        user_id: user.id,
        has_problem: !!values.problem,
      };

      try {
        await api.calls.complete(data);

        notification.success({
          message: "Succes",
          description: "Apel închis cu succes",
        });
        onClose();
        form.resetFields();
      } catch (error) {
        setApiErrorsToAntdForm(error);
      } finally {
        setLoading(false);
      }
    },
    [form, onClose, setApiErrorsToAntdForm, user?.id]
  );

  return (
    <Modal title="Detalii utlizator" open={!!user?.id} footer={null} onCancel={onClose}>
      <Descriptions column={1} className="mb-4">
        <Descriptions.Item label="Nume">
          <b>{user?.name}</b>
        </Descriptions.Item>
        <Descriptions.Item label="Telefon">
          <b>{user?.phone}</b>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <b>{user?.email}</b>
        </Descriptions.Item>
        <Descriptions.Item label="Data înregistrării">
          <b>
            {new Date(user?.created_at).toLocaleDateString("ro-RO", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </b>
        </Descriptions.Item>
      </Descriptions>

      <Form form={form} layout="vertical" onFinish={onCompleteCall} style={{ maxWidth: 600 }}>
        {!!globalErrors.length && (
          <Alert message="Error" description={globalErrors} type="error" showIcon />
        )}

        <Form.Item hidden name="global">
          <Input />
        </Form.Item>
        <Form.Item label="Problema" name="problem">
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>
        <Form.Item label="Sugestie" name="suggest">
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>
        <Form.Item label="Sursă" name="source">
          <Select loading={isLoading} disabled={isLoading} options={sources ?? []} />
        </Form.Item>
        <div className="d-flex justify-content-end">
          <Button className="mt-4" type="primary" htmlType="submit" loading={loading}>
            Închide
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

UserDetails.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
};
