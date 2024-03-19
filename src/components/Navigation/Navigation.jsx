import PropTypes from "prop-types";
import { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CloseOutlined, ExclamationCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { Badge, Button, Menu, Modal, Space, Typography } from "antd";
import { logout } from "../../store/actions/userAction";
import { userRoles } from "../../context/constants";

import "./styles/index.scss";

export default function Navigation({ closeMenu }) {
  const { requestsCount, supportCount, withdrawalCount, councilCount, user } = useSelector((store) => ({
    requestsCount: store.requestsCount,
    supportCount: store.supportList.count,
    councilCount: store.supportList.councilCount,
    withdrawalCount: store.withdrawal.count,
    user: store.user.payload,
  }));

  const dispatch = useDispatch();

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  const confirmLogout = useCallback(() => {
    Modal.confirm({
      title: "Esti sigur ca vrei sa te deconectezi?",
      icon: <ExclamationCircleOutlined />,
      okText: "Accept",
      cancelText: "Anulează",
      centered: true,
      onOk: handleLogout,
      zIndex: 1002,
      confirmLoading: true,
      maskClosable: true,
    });
  }, [handleLogout]);

  const menuItems = useMemo(() => {
    return [
      {
        key: "dashboard",
        label: <Link to="/">Dashboard</Link>,
      },
      {
        key: "withdrawal",
        label: (
          <Space align="center" className="justify-content-between">
            <Link to="/withdrawal">Cereri de retragere</Link>
            <Badge className="ms-2" key="withdrawal-list-requests" count={withdrawalCount} />
          </Space>
        ),
      },
      {
        key: "statistics",
        label: <Link to="/statistics">Statistică</Link>,
      },
      {
        key: "transactions",
        label: <Link to="/transactions">Tranzacții</Link>,
      },
      {
        key: "support",
        label: (
          <Space align="center" className="justify-content-between">
            <Link to="/support">Support</Link>
            <Badge className="ms-2" key="support-list-requests" count={supportCount} />
          </Space>
        ),
      },
      {
        key: "doctors",
        label: (
          <Space align="center" className="justify-content-between">
            <Link to="/doctors">Doctori</Link>
            <Badge className="ms-2" key="doctors-list-requests" count={requestsCount.count} />
          </Space>
        ),
      },
      {
        key: "users",
        label: <Link to="/users">Utilizatori</Link>,
        roles: [userRoles.get("denis")],
      },
      {
        key: "chats",
        label: <Link to="/chats">Chat-uri</Link>,
      },
      {
        key: "reviews",
        label: <Link to="/reviews">Testemoniale</Link>,
      },
      {
        key: "promo-codes",
        label: <Link to="/promo-codes">Promo coduri</Link>,
      },
      {
        key: "logs",
        label: <Link to="/logs">Istoricul</Link>,
      },
      {
        key: "global-settings",
        label: <Link to="/global-settings"> Setări globale</Link>,
      },
      {
        key: "logout",
        className: "logout-btn",
        label: "Deconectare",
        icon: <LogoutOutlined />,
        onClick: confirmLogout,
        roles: [userRoles.get("manager")],
      },
    ].filter((item) => user?.role === 1 || item?.roles?.includes(user?.role));
  }, [confirmLogout, councilCount, requestsCount.count, supportCount, user?.role, withdrawalCount]);

  return (
    <>
      <div className="dc-navigation">
        <Typography.Title level={3} className="logo">
          <Link to="/">Doctorchat</Link>
          <Button shape="circle" className="close-navigation" icon={<CloseOutlined />} onClick={closeMenu} />
        </Typography.Title>
        <Menu
          mode="inline"
          selectedKeys={[`${location.pathname.replace(/\//g, "") || "dashboard"}${location.search}`]}
          defaultOpenKeys={["sub-doctors", "sub-chats"].filter((key) =>
            window.location.pathname.includes(key.split("-")[1])
          )}
          items={menuItems}
        />
      </div>
    </>
  );
}

Navigation.propTypes = {
  closeMenu: PropTypes.func,
};
