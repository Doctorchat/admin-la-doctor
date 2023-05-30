import { Alert, Button, Checkbox, Col, Drawer, Form, Input, Row, Select, Switch } from "antd";
import { useCallback, useMemo } from "react";
import { useSessionStorage } from "react-use";
import { DcTable } from "../components";
import { useQuery } from "react-query";
import api from "../utils/appApi";
import fetcher from "../utils/fetcher";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectDoctorsOptions } from "../store/selectors/bootstrapSelectors";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

const tableStateKey = "bought-list-state";

export default function BoughtList() {
  const [state, setState] = useSessionStorage(tableStateKey, initialState);
  const [selectedRow, setSelectedRow] = useState(null);

  const { data: boughtList, isLoading, error } = useQuery([tableStateKey, state], fetcher(api.chats.bought));
  const { data: sources, isLoading: areSourcesLoading } = useQuery(["calls-sources"], () => api.calls.sources(), {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const doctors = useSelector((store) => selectDoctorsOptions(store));

  const onTableChange = useCallback(
    (pagination) => {
      const newState = { ...state };

      newState.page = pagination.current;

      setState(newState);
    },
    [setState, state]
  );

  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id" },
      {
        title: "Client",
        dataIndex: "client",
        render: ({ name, id }) => <Link to={`/user/${id}`}>{name}</Link>,
      },
      {
        title: "Telefon",
        dataIndex: "client",
        render: ({ phone }) => phone,
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        render: ({ name, id }) => <Link to={`/doctor/${id}`}>{name}</Link>,
      },
      {
        title: "Doctor Rating",
        dataIndex: "doctor",
        render: ({ rating }) => rating,
      },
      {
        title: "Acțiuni",
        render: (_, row) => (
          <Button type="primary" size="small" onClick={() => setSelectedRow(row)}>
            Editează
          </Button>
        ),
      },
    ],
    []
  );

  if (error) {
    return <Alert className="mt-5" showIcon type="error" message="Error" description="A apărut o eroare!" />;
  }

  return (
    <>
      <DcTable
        dataColumns={columns}
        dataSource={boughtList?.data || []}
        loading={isLoading}
        onTabelChange={onTableChange}
        pagination={{
          position: ["bottomRight"],
          per_page: boughtList?.per_page,
          total: boughtList?.total,
          current_page: boughtList?.current_page,
        }}
      />
      {Boolean(selectedRow) && (
        <Drawer title="Editare" placement="right" open={Boolean(selectedRow)} onClose={() => setSelectedRow(null)}>
          <Form layout="vertical">
            <Form.Item
              name="doctor_id"
              label="Doctor Asignat"
              rules={[
                {
                  required: true,
                  message: "Vă rugăm să selectați doctorul",
                },
              ]}
            >
              <Select options={doctors ?? []} placeholder="Selecteză doctor" />
            </Form.Item>
            <Form.Item label="Este mulțumit?" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item label="A fost sunat?" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item
              label="Sursă"
              name="source"
              rules={[
                {
                  required: true,
                  message: "Vă rugăm să selectați sursa",
                },
              ]}
            >
              <Select loading={areSourcesLoading} disabled={areSourcesLoading} options={sources ?? []} />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "please enter url description",
                },
              ]}
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} placeholder="please enter url description" />
            </Form.Item>

            <div className="form-bottom justify-content-end mt-4">
              <Button htmlType="submit" type="primary" className="mt-1">
                Salvează
              </Button>
            </div>
          </Form>
        </Drawer>
      )}
    </>
  );
}
