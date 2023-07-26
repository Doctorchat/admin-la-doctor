import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Drawer, Form, Input, InputNumber, notification, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import RegionInfo from "./RegionInfo";
import api from "../../utils/appApi";

import "./styles/index.scss";
import { useSelector } from "react-redux";
import { selectCategoriesOptions } from "../../store/selectors/bootstrapSelectors";
import { useQueryClient } from "react-query";

export default function DoctorForm(props) {
  const { onAfterSubmit, onSubmitFailed, submitBtnText, defaultValues, visible, onClose, docId, onSubmitSuccess } =
    props;
  const { categories } = useSelector((store) => ({ categories: selectCategoriesOptions(store) }));
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const queryClient = useQueryClient();

  const onCloseHandler = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const onSubmit = useCallback(
    async (values) => {
      const data = { ...values };

      data.id = docId;
      data.studies = data.studies.map((edc) => edc.value);
      data.speciality = data.speciality.map((cat) => {
        if (typeof cat === "number") {
          return cat;
        }

        return cat.value;
      });

      setLoading(true);

      try {
        const response = await api.doctors.update(data);
        await queryClient.invalidateQueries({ queryKey: ["doctor-by-id"] });
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
    [docId, queryClient, onAfterSubmit, onSubmitSuccess, onSubmitFailed]
  );

  const initialValues = useMemo(() => {
    if (defaultValues && Object.keys(defaultValues).length) {
      const docFormObject = {
        email: defaultValues.email,
        phone: defaultValues.phone,
        title: defaultValues.card?.title,
        specialization_ro: defaultValues.card?.specialization?.ro,
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
        rating: defaultValues.card?.rating,
        workplace: defaultValues.card?.workplace,
        studies: defaultValues.card?.studies.map((std) => ({ value: std })),
        bio_ro: defaultValues.card?.bio?.ro,
        status: defaultValues.card?.status ? Boolean(defaultValues.card.status) : false,
        hidden: defaultValues.card?.hidden,
        card_regions: defaultValues.card_regions,
        corporate_program: defaultValues.card?.companies_program,
        companies_price: defaultValues.card?.companies_price,
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
              <Input disabled />
            </Form.Item>
            <Form.Item className="w-100" label="Telefon" name="phone">
              <Input />
            </Form.Item>
          </div>
          <div className="d-sm-flex gap-2">
            <Form.Item className="w-100" name="title" label="Titlu Profesional" rules={[{ required: true }]}>
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
          <Form.Item name="speciality" label="Specialitate" rules={[{ required: true }]}>
            <Select mode="multiple" options={categories} />
          </Form.Item>
          <Form.Item name="rating" label="Rating" rules={[{ required: true, type: "number", min: 1, max: 100 }]}>
            <InputNumber />
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

          <Form.Item name="card_regions" label="Regiune">
            <RegionInfo />
          </Form.Item>

          <div className="d-sm-flex gap-2">
            <Form.Item name="corporate_program" label="Participă în program corporativ" className="w-100">
              <Select
                placeholder="Selectează"
                options={[
                  { value: true, label: "Da" },
                  { value: false, label: "Nu" },
                ]}
              />
            </Form.Item>
            <Form.Item noStyle shouldUpdate={(prev, next) => prev.corporate_program !== next.corporate_program}>
              {({ getFieldValue }) =>
                getFieldValue("corporate_program") && (
                  <Form.Item name="companies_price" label="Prețul" rules={[{ required: true }]}>
                    <InputNumber />
                  </Form.Item>
                )
              }
            </Form.Item>
          </div>

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
