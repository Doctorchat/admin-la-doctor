import {
  Alert,
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  notification,
  Popconfirm,
  Select,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import {
  getPromocodesList,
  cleanPromocodesList,
  setCleanOnUnmountTrue,
  deletePomocode,
  updatePromocode,
} from "../../store/actions/promocodesAction";
import { DcTable } from "../../components";
import date from "../../utils/date";
import { promoInputReplacer } from "../../pages/PromocodesPage";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

const tableStateKey = "promo-codes-list-state";

export const promocodeStatuses = [
  {
    value: "published",
    label: "Publicat",
  },
  {
    value: "draft",
    label: "Ascuns",
  },
];

export default function PromoCodesList() {
  const [state, setState] = useSessionStorage(tableStateKey, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [removePromocodeLoading, setRemovePromocodeLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [activePromocode, setActivePromocode] = useState(null);
  const { promocodes, cleanOnUnmount } = useSelector((store) => ({
    promocodes: store.promocodesList.payload,
    cleanOnUnmount: store.promocodesList.cleanOnUnmount,
  }));
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const fetcher = useCallback(async () => {
    const { page, sort_column, sort_direction } = state;

    setLoading(true);

    try {
      await dispatch(getPromocodesList({ page, sort_column, sort_direction }));
    } catch (error) {
      if (error.response.status === 500) {
        setError({
          status: error.response.status,
          message: error.response.data.message,
        });
        sessionStorage.removeItem(tableStateKey);
      }
    } finally {
      setLoading(false);
    }
  }, [dispatch, state]);

  useEffect(fetcher, [fetcher]);

  useMount(() => {
    dispatch(setCleanOnUnmountTrue());
  });

  useUnmount(() => {
    if (cleanOnUnmount) {
      sessionStorage.removeItem(tableStateKey);
      dispatch(cleanPromocodesList());
    }
  });

  const onTableChange = useCallback(
    (pagination) => {
      const newState = { ...state };

      newState.page = pagination.current;

      setState(newState);
    },
    [setState, state]
  );

  const onViewPromocode = useCallback(
    (promocode) => () => {
      setActivePromocode(promocode);
    },
    []
  );

  const onClosePromocode = useCallback(() => setActivePromocode(null), []);

  const removeHandler = useCallback(
    (id) => async () => {
      setRemovePromocodeLoading(id);
      await dispatch(deletePomocode(id));
      setRemovePromocodeLoading(null);
    },
    [dispatch]
  );

  const onEditSubmit = useCallback(
    async (values) => {
      const data = { ...values };

      data.id = activePromocode.id;

      setEditLoading(true);

      try {
        await dispatch(updatePromocode(data));
      } catch (error) {
        notification.error({ message: "Eroare", description: "A apărut o eraore" });
      } finally {
        setEditLoading(false);
      }
    },
    [activePromocode, dispatch]
  );

  useEffect(() => {
    if (activePromocode && Object.keys(activePromocode).length) {
      form.setFields([
        { name: "name", value: activePromocode.name },
        { name: "discount", value: activePromocode.discount },
        { name: "status", value: activePromocode.status },
      ]);
    } else {
      form.resetFields();
    }
  }, [activePromocode, form]);

  const columns = useMemo(
    () => [
      {
        title: "Cod",
        dataIndex: "name",
      },
      {
        title: "Reducere(%)",
        dataIndex: "discount",
      },
      {
        title: "Status",
        dataIndex: "status",
        render: (rowData) => promocodeStatuses.find((status) => status.value === rowData)?.label,
      },
      {
        title: "Creat",
        dataIndex: "created_at",
        render: (rowData) => date(rowData).dynamic(),
      },
      {
        title: "Acțiuni",
        render: (_, row) => (
          <>
            <Button type="primary" size="small" className="me-2" onClick={onViewPromocode(row)}>
              Editează
            </Button>
            <Popconfirm
              title="Ești sigur ca vreai sa ștergi acestă cerere?"
              placement="left"
              onConfirm={removeHandler(row.id)}
              okText="Accept"
              cancelText="Anulează"
            >
              <Button
                type="primary"
                size="small"
                danger
                loading={removePromocodeLoading === row.id}
              >
                Șterge
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ],
    [onViewPromocode, removeHandler, removePromocodeLoading]
  );

  if (error) {
    return <Alert showIcon type="error" message="Error" description="A apărut o eroare!" />;
  }

  return (
    <>
      <Drawer visible={!!activePromocode} onClose={onClosePromocode} title="Editare promo-cod">
        <Form layout="vertical" form={form} onFinish={onEditSubmit}>
          <Form.Item name="name" label="Cod" normalize={(value) => promoInputReplacer(value)}>
            <Input placeholder="WINTER10" disabled autoComplete="off" />
          </Form.Item>
          <Form.Item name="discount" label="Reducere">
            <InputNumber step={1} addonBefore="%" min={1} max={100} placeholder="10" />
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select placeholder="Selectează" options={promocodeStatuses} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={editLoading}>
            Salveză
          </Button>
        </Form>
      </Drawer>
      <DcTable
        dataColumns={columns}
        dataSource={promocodes}
        loading={loading}
        onTabelChange={onTableChange}
        rowClassName={(row) => row.status === "draft" && "chat-row-closed"}
        pagination={{
          position: ["none"],
        }}
      />
    </>
  );
}
