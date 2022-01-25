import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouteMatch, useParams, Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { Badge, Button, Menu, Typography } from "antd";

import "./styles/index.scss";

const menuItemsRegister = {
  "/": "dashboard",
  "/statistics": "statistics",
  "/doctors": "doctors",
  "/doctor/": "doctors",
  "/requests": "doctors",
  "/users": "users",
  "/user/": "users",
  "/chats": "chats",
  "/reviews": "reviews",
  "/promo-codes": "promo-codes",
  "/logs": "logs",
  "/global-settings": "global-settings",
};

export default function Navigation({ closeMenu }) {
  const requestsCount = useSelector((store) => store.requestsCount);
  const [currentRoute, setCurrentRoute] = useState();
  const routeMatch = useRouteMatch();
  const params = useParams();

  useEffect(() => {
    const replacer = new RegExp(Object.values(params).join("|"), "g");
    setCurrentRoute(routeMatch.url.replace(replacer, ""));
  }, [params, routeMatch.url]);

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
          <Menu.Item key="statistics">
            <Link to="/statistics">Statistică</Link>
          </Menu.Item>
          <Menu.Item key="doctors">
            <div className="d-flex align-items-center justify-content-between">
              <Link to="/doctors">Doctori</Link>
              <Badge className="ms-2" key="doctors-list-requests" count={requestsCount.count} />
            </div>
          </Menu.Item>
          <Menu.Item key="users">
            <Link to="/users">Utilizatori</Link>
          </Menu.Item>
          <Menu.Item key="chats">
            <Link to="/chats">Chat-uri</Link>
          </Menu.Item>
          <Menu.Item key="reviews">
            <Link to="/reviews">Testemoniale</Link>
          </Menu.Item>
          <Menu.Item key="promo-codes" disabled>
            Promo coduri
          </Menu.Item>
          <Menu.Item key="logs" disabled>
            Istoricul
          </Menu.Item>
          <Menu.Item key="global-settings">
            <Link to="/global-settings"> Setări globale</Link>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}

Navigation.propTypes = {
  closeMenu: PropTypes.func,
};
