import { Button, Form, Input, InputNumber, Modal, PageHeader, Select } from "antd";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { PromoCodesList } from "../modules";
import { promocodeStatuses } from "../modules/PromoCodesList/PromoCodesList";
import { createPromocode } from "../store/actions/promocodesAction";

export const promoInputReplacer = (value) => {
  if (value) {
    return value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  }

  return value;
};

export default function PromocodesPage() {
  const [addPromoVisible, setAddPromoVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFormSubmit = useCallback(
    async (values) => {
      setLoading(true);
      await dispatch(createPromocode(values));
      setLoading(false);

      form.resetFields();
      setAddPromoVisible(false);
    },
    [dispatch, form]
  );

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Promo Coduri"
        extra={[
          <Button key="promocode-add" type="primary" onClick={() => setAddPromoVisible(true)}>
            Adaugă
          </Button>,
        ]}
      />
      <Modal
        title="Adaugă Promo-cod"
        centered
        visible={addPromoVisible}
        onOk={form.submit}
        okButtonProps={{ loading }}
        okText="Adaugă"
        cancelText="Anulează"
        onCancel={() => setAddPromoVisible(false)}
      >
        <Form layout="vertical" form={form} onFinish={onFormSubmit}>
          <Form.Item name="name" label="Cod" normalize={(value) => promoInputReplacer(value)}>
            <Input placeholder="WINTER10" autoComplete="off" />
          </Form.Item>
          <Form.Item name="discount" label="Reducere">
            <InputNumber step={1} addonBefore="%" min={1} max={100} placeholder="10" />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select placeholder="Selectează" options={promocodeStatuses} />
          </Form.Item>
        </Form>
      </Modal>
      <PromoCodesList />
    </>
  );
}
