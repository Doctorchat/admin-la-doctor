import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch, useParams, Link } from "react-router-dom";
import { CloseOutlined, ExclamationCircleOutlined, LogoutOutlined } from "@ant-design/icons";
import { Badge, Button, Menu, Modal, Typography } from "antd";

const { SubMenu } = Menu;

import "./styles/index.scss";
import { logout } from "../../store/actions/userAction";

const menuItemsRegister = {
  "/": "dashboard",
  "/statistics": "statistics",
  "/support": "support",
  "/doctors?hidden": "doctors-hidden",
  "/doctors": "doctors",
  "/doctor/": "doctors",
  "/requests": "doctors",
  "/users": "users",
  "/user/": "users",
  "/chats": "chats",
  "/internals": "chats-internal",
  "/reviews": "reviews",
  "/promo-codes": "promo-codes",
  "/logs": "logs",
  "/global-settings": "global-settings",
  "/withdrawal": "withdrawal",
  "/council-list": "council-list",
};

export default function Navigation({ closeMenu }) {
  const { requestsCount, supportCount, withdrawalCount, councilCount } = useSelector((store) => ({
    requestsCount: store.requestsCount,
    supportCount: store.supportList.count,
    councilCount: store.supportList.councilCount,
    withdrawalCount: store.withdrawal.count,
  }));
  const [currentRoute, setCurrentRoute] = useState();
  const routeMatch = useRouteMatch();
  const params = useParams();

  useEffect(() => {
    const replacer = new RegExp(Object.values(params).join("|"), "g");
    setCurrentRoute(routeMatch.url.replace(replacer, "") + window.location.search);
  }, [params, routeMatch.url]);

  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  function confirmLogout() {
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
  }

  return (
    <>
      <div className="dc-navigation">
        <Typography.Title level={3} className="logo">
          <Link to="/">Doctorchat</Link>
          <Button
            shape="circle"
            className="close-navigation"
            icon={<CloseOutlined />}
            onClick={closeMenu}
          />
        </Typography.Title>
        <Menu mode="inline" selectedKeys={menuItemsRegister[currentRoute]}>
          <Menu.Item key="dashboard">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="council-list">
            <div className="d-flex align-items-center justify-content-between">
              <Link to="/council-list">Consilii</Link>
              <Badge className="ms-2" key="council-list-requests" count={councilCount} />
            </div>
          </Menu.Item>
          <Menu.Item key="withdrawal">
            <div className="d-flex align-items-center justify-content-between">
              <Link to="/withdrawal">Cereri de retragere</Link>
              <Badge className="ms-2" key="withdrawal-list-requests" count={withdrawalCount} />
            </div>
          </Menu.Item>
          <Menu.Item key="statistics">
            <Link to="/statistics">Statistică</Link>
          </Menu.Item>
          <Menu.Item key="support">
            <div className="d-flex align-items-center justify-content-between">
              <Link to="/support">Support</Link>
              <Badge className="ms-2" key="support-list-requests" count={supportCount} />
            </div>
          </Menu.Item>
          <SubMenu
            key="sub-doctors"
            title={
              <div className="d-flex align-items-center justify-content-between">
                <span>Lista de Doctori</span>
                <Badge className="ms-2" key="doctors-list-requests" count={requestsCount.count} />
              </div>
            }
          >
            <Menu.Item key="doctors">
              <div className="d-flex align-items-center justify-content-between">
                <Link to="/doctors">Doctori</Link>
                <Badge className="ms-2" key="doctors-list-requests" count={requestsCount.count} />
              </div>
            </Menu.Item>
            <Menu.Item key="doctors-hidden">
              <Link to="/doctors?hidden">Doctori Ascunși</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="users">
            <Link to="/users">Utilizatori</Link>
          </Menu.Item>
          <SubMenu key="sub-chats" title="Lista de chat-uri">
            <Menu.Item key="chats">
              <Link to="/chats">Chat-uri cu clienți</Link>
            </Menu.Item>
            <Menu.Item key="chats-internal">
              <Link to="/internals">Chat-uri între doctori</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="reviews">
            <Link to="/reviews">Testemoniale</Link>
          </Menu.Item>
          <Menu.Item key="promo-codes">
            <Link to="/promo-codes">Promo coduri</Link>
          </Menu.Item>
          <Menu.Item key="logs">
            <Link to="/logs">Istoricul</Link>
          </Menu.Item>
          <Menu.Item key="global-settings">
            <Link to="/global-settings"> Setări globale</Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            className="logout-btn"
            icon={<LogoutOutlined />}
            onClick={confirmLogout}
          >
            Deconectare
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}

Navigation.propTypes = {
  closeMenu: PropTypes.func,
};
