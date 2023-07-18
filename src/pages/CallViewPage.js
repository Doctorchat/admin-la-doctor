import { Alert, Button, Form, Input, InputNumber, PageHeader, notification } from "antd";
import { useCallback, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import useApiErrorsWithAntd from "../hooks/useApiErrorsWithAntd";
import api from "../utils/appApi";
import usePermissionsRedirect from "../hooks/usePermissionsRedirect";

export default function CallViewPage() {
  usePermissionsRedirect({ allowedRoles: [4] });

  const { user_id } = useParams();
  const { replace } = useHistory();

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const { setApiErrorsToAntdForm } = useApiErrorsWithAntd(form);
  const globalErrors = form.getFieldError("global");

  const onCompleteCall = useCallback(
    async (values) => {
      setLoading(true);

      const data = {
        ...values,
        user_id,
        has_problem: !!values.problem,
      };

      try {
        await api.calls.complete(data);
        notification.success({
          message: "Succes",
          description: "Apel închis cu succes",
        });
        replace("/calls");
      } catch (error) {
        setApiErrorsToAntdForm(error);
        setLoading(false);
      }
    },
    [replace, setApiErrorsToAntdForm, user_id]
  );

  return (
    <>
      <PageHeader className="site-page-header" title="Finalizare apel" onBack={history.goBack} />

      <Form form={form} disabled={!user_id} layout="vertical" onFinish={onCompleteCall} style={{ maxWidth: 600 }}>
        {!!globalErrors.length && <Alert message="Error" description={globalErrors} type="error" showIcon />}

        <Form.Item hidden name="global">
          <Input />
        </Form.Item>
        <Form.Item label="Problema" name="problem">
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>
        <Form.Item label="Soluție" name="suggest">
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Form.Item>
        <Form.Item label="Sursă" name="source">
          <InputNumber min={0} />
        </Form.Item>
        <Button className="mt-4" type="primary" htmlType="submit" loading={loading}>
          Închide
        </Button>
      </Form>
    </>
  );
}
