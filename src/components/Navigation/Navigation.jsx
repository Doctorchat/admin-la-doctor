import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import { Badge, Button, Menu, Typography } from "antd";
import { Link } from "react-router-dom";

import "./styles/index.scss";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const menuItemsRegister = {
  "/": "dashboard",
  "/statistic": "statistic",
  "/doctors": "doctors",
  "/doctor/": "doctors",
  "/requests": "doctors",
  "/users": "users",
  "/chats": "chats",
  "/reviews": "reviews",
  "/promo-codes": "promo-codes",
  "/logs": "logs",
  "/global-settings": "global-settings",
};

export default function Navigation({ closeMenu }) {
  const routeMatch = useRouteMatch();
  const params = useParams();
  const [currentRoute, setCurrentRoute] = useState();

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
          <Menu.Item key="statistic" disabled>
            Statistică
          </Menu.Item>
          <Menu.Item key="doctors">
            <div className="d-flex align-items-center justify-content-between">
              <Link to="/doctors">Doctori</Link>
              <Badge className="ms-2" key="doctors-list-requests" count={0} />
            </div>
          </Menu.Item>
          <Menu.Item key="users" disabled>
            Utilizatori
          </Menu.Item>
          <Menu.Item key="chats">
            <Link to="/chats">Chat-uri</Link>
          </Menu.Item>
          <Menu.Item key="reviews" disabled>
            <Link to="/reviews">Testemoniale</Link>
          </Menu.Item>
          <Menu.Item key="promo-codes" disabled>
            Promo coduri
          </Menu.Item>
          <Menu.Item key="logs" disabled>
            Istoricul
          </Menu.Item>
          <Menu.Item key="global-settings" disabled>
            Setări globale
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}

Navigation.propTypes = {
  closeMenu: PropTypes.func,
};
