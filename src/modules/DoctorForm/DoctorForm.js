import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Drawer, Form, Input, InputNumber, notification, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import api from "../../utils/appApi";

import "./styles/index.scss";
import { useSelector } from "react-redux";
import { selectCategoriesOptions } from "../../store/selectors/bootstrapSelectors";

export default function DoctorForm(props) {
  const {
    onAfterSubmit,
    onSubmitFailed,
    submitBtnText,
    defaultValues,
    visible,
    onClose,
    docId,
    onSubmitSuccess,
  } = props;
  const { categories } = useSelector((store) => ({ categories: selectCategoriesOptions(store) }));
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onCloseHandler = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const onSubmit = useCallback(
    async (values) => {
      const data = { ...values };

      data.id = docId;
      data.speciality = data.speciality.map((cat) => cat.value);
      data.studies = data.studies.map((edc) => edc.value);

      setLoading(true);

      try {
        const response = await api.doctors.update(data);

        notification.success({
          message: "Succes",
          description: "Datele au fost actualizate cu succes!",
        });

        if (onAfterSubmit) onAfterSubmit(response.data);
        if (onSubmitSuccess) onSubmitSuccess(response.data);
      } catch (error) {
        if (onSubmitFailed) onSubmitFailed(error);
        notification.error({ message: "Eroare", description: "A apărut o eraore" });
      } finally {
        setLoading(false);
      }
    },
    [docId, onAfterSubmit, onSubmitFailed, onSubmitSuccess]
  );

  const initialValues = useMemo(() => {
    if (defaultValues && Object.keys(defaultValues).length) {
      const docFormObject = {
        email: defaultValues.email,
        phone: defaultValues.phone,
        title: defaultValues.card?.title,
        specialization_ro: defaultValues.card?.specialization_ro,
        name: defaultValues.name,
        experience: defaultValues.card?.experience,
        public_price: defaultValues.card?.public_price,
        private_price: defaultValues.card?.private_price,
        meet_price: defaultValues.card?.meet_price,
        meet_price_private: defaultValues.card?.meet_price_private,
        speciality: defaultValues.card?.speciality.map((spec) => ({
          value: spec.id,
          label: spec.name_ro,
        })),
        workplace: defaultValues.card?.workplace,
        studies: defaultValues.card?.studies.map((std) => ({ value: std })),
        bio_ro: defaultValues.card?.bio_ro,
        status: defaultValues.card?.status ? Boolean(defaultValues.card.status) : false,
      };

      if (defaultValues.card?.studies && defaultValues.card.studies?.length) {
        return docFormObject;
      }

      return { ...docFormObject, studies: [{ value: "" }] };
    }

    return { studies: [{ value: "" }] };
  }, [defaultValues]);

  useEffect(() => {
    const fields = Object.entries(initialValues).map(([key, value]) => ({ name: key, value }));
    form.setFields(fields);
  }, [form, initialValues]);

  return (
    <Drawer
      size="default"
      title="Actualizare doctor"
      visible={visible}
      onClose={onCloseHandler}
      contentWrapperStyle={{
        width: 560,
        maxWidth: "100%",
      }}
    >
      <div className="doctor-form">
        <Form initialValues={initialValues} form={form} onFinish={onSubmit} layout="vertical">
          <div className="d-sm-flex gap-2">
            <Form.Item
              className="w-100"
              label="Email"
              name="email"
              rules={[{ required: true }, { type: "email", message: "Acest email nu este valid" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="w-100" label="Telefon" name="phone">
              <Input />
            </Form.Item>
          </div>
          <div className="d-sm-flex gap-2">
            <Form.Item
              className="w-100"
              name="title"
              label="Titlu Profesional"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item className="w-100" name="specialization_ro" label="Specializare">
              <Input />
            </Form.Item>
          </div>
          <div className="d-sm-flex gap-2">
            <Form.Item className="w-100" label="Nume" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="experience" label="Experiență" rules={[{ required: true }]}>
              <InputNumber addonBefore="ANI" />
            </Form.Item>
          </div>
          <div className="d-sm-flex gap-2">
            <Form.Item
              className="w-100"
              name="public_price"
              label="Preț mesaj"
              rules={[{ required: true }]}
            >
              <InputNumber addonBefore="LEI" />
            </Form.Item>

            <Form.Item
              className="w-100"
              name="private_price"
              label="Preț mesaj (privat)"
              rules={[{ required: true }]}
            >
              <InputNumber addonBefore="LEI" />
            </Form.Item>
          </div>
          <div className="d-sm-flex gap-2">
            <Form.Item
              className="w-100"
              name="meet_price"
              label="Preț meeting"
              rules={[{ required: true }]}
            >
              <InputNumber addonBefore="LEI" />
            </Form.Item>
            <Form.Item
              className="w-100"
              name="meet_price_private"
              label="Preț meeting (privat)"
              rules={[{ required: true }]}
            >
              <InputNumber addonBefore="LEI" />
            </Form.Item>
          </div>
          <Form.Item name="speciality" label="Specialitate" rules={[{ required: true }]}>
            <Select mode="multiple" options={categories} />
          </Form.Item>
          <Form.Item name="workplace" label="Locul de muncă" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.List name="studies" rules={[{ required: true }]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <div className="d-flex align-items-end" key={field.key}>
                    <Form.Item
                      {...field}
                      label="Educație"
                      name={[field.name, "value"]}
                      className="w-100"
                      rules={[{ required: true, message: "Acest câmp este obligatoriu" }]}
                    >
                      <Input />
                    </Form.Item>
                    {field.name !== 0 && (
                      <Button
                        type="dashed"
                        danger
                        onClick={() => remove(field.name)}
                        style={{ marginBottom: 24, marginLeft: 6 }}
                      >
                        Șterge
                      </Button>
                    )}
                  </div>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    className="d-flex align-items-center justify-content-center"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Adaugă Educație
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item name="bio_ro" label="Despre">
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item name="status" label="Statusul" rules={[{ required: true }]}>
            <Select
              options={[
                { value: true, label: "Visibil" },
                { value: false, label: "Ascuns" },
              ]}
            />
          </Form.Item>
          <div className="form-bottom justify-content-end mt-0">
            <Button htmlType="submit" type="primary" className="mt-1" loading={loading}>
              {submitBtnText}
            </Button>
          </div>
        </Form>
      </div>
    </Drawer>
  );
}

DoctorForm.propTypes = {
  submitBtnText: PropTypes.string,
  defaultValues: PropTypes.object,
  onAfterSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmitSuccess: PropTypes.func,
  docId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DoctorForm.defaultProps = {
  submitBtnText: "Trimite",
  defaultValues: {},
};
