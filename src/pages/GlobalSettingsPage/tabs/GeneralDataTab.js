import { Button, Form, InputNumber, Select } from "antd";

export default function GeneralDataTab() {
  return (
    <Form layout="vertical">
      <div className="d-sm-flex gap-2">
        <Form.Item className="w-100" name="z2" label="Coeficient zona 2">
          <InputNumber step={0.1} />
        </Form.Item>
        <Form.Item className="w-100" name="z3" label="Coeficient zona 3">
          <InputNumber step={0.1} />
        </Form.Item>
        <Form.Item className="w-100" name="z4" label="Coeficient zona 4">
          <InputNumber step={0.1} />
        </Form.Item>
      </div>
      <div className="d-sm-flex gap-2">
        <Form.Item className="w-100" name="auto" label="Preț auto-select">
          <InputNumber step={0.1} />
        </Form.Item>
        <Form.Item className="w-100" name="consilium" label="Preț consiliu">
          <InputNumber step={0.1} />
        </Form.Item>
        <Form.Item className="w-100" name="attach" label="Preț document/imagine">
          <InputNumber step={0.1} />
        </Form.Item>
      </div>
      <Form.Item className="w-100" name="env" label="Metoda de plată">
        <Select
          options={[
            { value: "dev", label: "Carduri de test" },
            { value: "live", label: "Carduri reale" },
          ]}
        />
      </Form.Item>
      <div className="d-flex justify-content-end">
        <Button htmlType="submit" type="primary">
          Salvează
        </Button>
      </div>
    </Form>
  );
}
