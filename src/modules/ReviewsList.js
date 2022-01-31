import PropTypes from "prop-types";
import { Alert, Button, Drawer, Form, Input, notification, Select } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useMount, useSessionStorage, useUnmount } from "react-use";
import { DcTable } from "../components";
import {
  cleanReviewsList,
  getReviewsList,
  setCleanOnUnmountFalse,
  setCleanOnUnmountTrue,
  updateReivew,
} from "../store/actions/reviewsListAction";
import date from "../utils/date";
import api from "../utils/appApi";

const initialState = {
  page: 1,
  sort_column: "id",
  sort_direction: "descend",
};

export const reviewStatuses = {
  0: "Vizibil pentru doctor",
  1: "Vizibil pentru doctor și home page",
  2: "Ascuns pentru toți",
};

const tableStateKey = "reviews-list-state";

export default function ReviewsList(props) {
  const { simplified, title, extra } = props;
  const [state, setState] = useSessionStorage(tableStateKey, initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeReview, setActiveReview] = useState(null);
  const { reviews, cleanOnUnmount } = useSelector((store) => ({
    reviews: store.reviewsList.payload,
    cleanOnUnmount: store.reviewsList.cleanOnUnmount,
  }));
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();

  const fetcher = useCallback(async () => {
    const { page, sort_column, sort_direction } = state;
    const limit = simplified ? 10 : 20;

    setLoading(true);

    try {
      await dispatch(getReviewsList({ page, sort_column, sort_direction, limit }));
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
  }, [dispatch, simplified, state]);

  useEffect(fetcher, [fetcher]);

  useMount(() => {
    dispatch(setCleanOnUnmountTrue());
  });

  useUnmount(() => {
    if (cleanOnUnmount) {
      sessionStorage.removeItem(tableStateKey);
      dispatch(cleanReviewsList());
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

  const onTableLinksClick = useCallback(
    (path) => async (e) => {
      e.preventDefault();

      await dispatch(setCleanOnUnmountFalse());
      history.push(path);
    },
    [dispatch, history]
  );

  const onViewReview = useCallback(
    (review) => () => {
      setActiveReview(review);
    },
    []
  );

  const onCloseReview = useCallback(() => {
    setActiveReview(null);
  }, []);

  useEffect(() => {
    if (activeReview && Object.keys(activeReview).length) {
      form.setFields([
        { name: "content", value: activeReview.content },
        { name: "visibility", value: activeReview.visibility },
      ]);
    } else {
      form.resetFields();
    }
  }, [activeReview, form]);

  const onReviewEdit = useCallback(
    async (values) => {
      const data = { ...values };

      data.id = activeReview.id;

      try {
        const res = await api.reviews.update(data);
        dispatch(updateReivew(res.data));
        onCloseReview();
      } catch (error) {
        notification.error({ message: "Eroare", description: "A apărut o eroare" });
      }
    },
    [activeReview, dispatch, onCloseReview]
  );

  const columns = useMemo(
    () => [
      {
        title: "Client",
        dataIndex: "user",
        render: (rowData) => (
          <a href={`/user/${rowData?.id}`} onClick={onTableLinksClick(`/user/${rowData?.id}`)}>
            {rowData?.name}
          </a>
        ),
      },
      {
        title: "Doctor",
        dataIndex: "doctor",
        render: ({ name, id }) => (
          <a href={`/doctor/${id}`} onClick={onTableLinksClick(`/user/${id}`)}>
            {name}
          </a>
        ),
      },
      {
        title: "ID Conversație",
        dataIndex: "chat_id",
        render: (rowData) => (
          <a href={`/chat/${rowData}`} onClick={onTableLinksClick(`/chat/${rowData}`)}>
            #{rowData}
          </a>
        ),
      },
      {
        title: "Data",
        dataIndex: "created_at",
        render: (rowData) => date(rowData).full,
      },
      // {
      //   title: "Acțiune",
      //   dataIndex: "like",
      //   render: (rowData) => (rowData ? <LikeOutlined /> : <DislikeOutlined />),
      // },
      {
        title: "Conținut",
        dataIndex: "content",
        ellipsis: true,
      },
      {
        title: "Vizualizare",
        render: (_, row) => (
          <Button type="primary" size="small" onClick={onViewReview(row)}>
            Deschide
          </Button>
        ),
      },
    ],
    [onTableLinksClick, onViewReview]
  );

  if (error) {
    return <Alert showIcon type="error" message="Error" description="A apărut o eroare!" />;
  }

  return (
    <>
      <Drawer visible={!!activeReview} onClose={onCloseReview} title="Editare recenzie">
        <Form layout="vertical" form={form} onFinish={onReviewEdit}>
          <Form.Item label="Conținut" name="content">
            <Input.TextArea autoSize />
          </Form.Item>
          <Form.Item label="Status" name="visibility">
            <Select
              options={[
                { value: 0, label: "Vizibil pentru doctor" },
                { value: 1, label: "Vizibil in chat pentru clienți" },
                { value: 2, label: "Visibil peste tot" },
              ]}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Salveză
          </Button>
        </Form>
      </Drawer>
      <DcTable
        title={title}
        dataColumns={columns}
        dataSource={reviews?.data || []}
        loading={loading}
        onTabelChange={onTableChange}
        rowClassName={(row) => (row.like ? "review-like" : "review-dislike")}
        pagination={{
          position: [simplified ? "none" : "bottomRight"],
          per_page: reviews?.per_page,
          total: reviews?.total,
          current_page: reviews?.current_page,
        }}
        extra={extra}
      />
    </>
  );
}

ReviewsList.propTypes = {
  simplified: PropTypes.bool,
  title: PropTypes.string,
  extra: PropTypes.element,
};
