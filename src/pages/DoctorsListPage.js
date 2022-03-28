import { SearchOutlined } from "@ant-design/icons";
import { PageHeader, Button, Badge, Form, Input, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DoctorsList } from "../modules";
import { setCleanOnUnmountFalse } from "../store/actions/doctorsListAction";
import { updateRequestsCount } from "../store/actions/requestsCountAction";
import api from "../utils/appApi";
import getApiErrorMessages from "../utils/getApiErrorMessages";

export default function DoctorsListPage() {
  const { requestsCount, doctors } = useSelector((store) => ({
    requestsCount: store.requestsCount,
    doctors: store.doctorsList.payload,
  }));
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchedList, setSearchedList] = useState(null);
  const [searchBtnDisabled, setSearchBtnDisabled] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOutsideLinkClick = useCallback(
    (path) => async (e) => {
      e.preventDefault();

      await dispatch(setCleanOnUnmountFalse());
      history.push(path);
    },
    [dispatch, history]
  );

  useEffect(() => {
    dispatch(updateRequestsCount());
  }, [dispatch]);

  const onSearch = useCallback(async (values) => {
    let { keyword } = values;

    if (keyword) {
      setSearchLoading(true);
      try {
        const response = await api.doctors.search(keyword);
        setSearchedList(response.data);
      } catch (error) {
        notification.error({ message: "Eroare", description: getApiErrorMessages });
      } finally {
        setSearchLoading(false);
      }
    }
  }, []);

  const onSearchChange = useCallback((_, values) => {
    if (values?.keyword && values.keyword.length > 2) {
      setSearchBtnDisabled(false);
    } else {
      setSearchBtnDisabled(true);
      setSearchedList(null);
    }
  }, []);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={`Doctori (${doctors?.total || 0})`}
        extra={[
          <Badge key="doctors-list-requests" count={requestsCount.count} showZero>
            <Link to="/requests" onClick={handleOutsideLinkClick("/requests")}>
              <Button type="primary">Cereri</Button>
            </Link>
          </Badge>,
        ]}
      />
      <Form layout="inline" className="mb-2" onFinish={onSearch} onValuesChange={onSearchChange}>
        <Form.Item name="keyword" style={{ minWidth: 280 }}>
          <Input placeholder="Nume, Prenume" addonBefore={<SearchOutlined />} />
        </Form.Item>
        <Button
          type="primary"
          disabled={searchBtnDisabled}
          loading={searchLoading}
          htmlType="submit"
        >
          Caută
        </Button>
      </Form>
      <DoctorsList searchedList={searchedList} />
    </>
  );
}
