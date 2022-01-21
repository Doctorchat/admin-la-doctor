import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { Button, Menu, Typography } from "antd";
import { Link } from "react-router-dom";

import "./styles/index.scss";

const menuItemsRegister = {
  "/": "dashboard",
  "/statistic": "statistic",
  "/doctors": "doctors",
  "/users": "users",
  "/chats": "chats",
  "/reviews": "reviews",
  "/promo-codes": "promo-codes",
  "/logs": "logs",
  "/global-settings": "global-settings",
};

export default function Navigation({ closeMenu }) {
  const routeMatch = useRouteMatch();

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
        <Menu mode="inline" selectedKeys={menuItemsRegister[routeMatch.url]}>
          <Menu.Item key="dashboard">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="statistic">Statistică</Menu.Item>
          <Menu.Item key="doctors">
            <Link to="/doctors">Doctori</Link>
          </Menu.Item>
          <Menu.Item key="users">Utilizatori</Menu.Item>
          <Menu.Item key="chats">
            <Link to="/chats">Chat-uri</Link>
          </Menu.Item>
          <Menu.Item key="reviews">
            <Link to="/reviews">Testemoniale</Link>
          </Menu.Item>
          <Menu.Item key="promo-codes">Promo coduri</Menu.Item>
          <Menu.Item key="logs">Istoricul</Menu.Item>
          <Menu.Item key="global-settings">Setări globale</Menu.Item>
        </Menu>
      </div>
    </>
  );
}

Navigation.propTypes = {
  closeMenu: PropTypes.func,
};
