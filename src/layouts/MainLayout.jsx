import PropTypes from "prop-types";
import { Navigation } from "../components";
import {
  MenuOutlined,
  LoadingOutlined,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Modal, Spin } from "antd";
import { useState } from "react";
import cs from "../utils/classNames";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/userAction";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function MainLayout({ children }) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const spinnerIndicator = useSelector((store) => store.spinnerIndicator);
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
    <div className="dc-layout">
      <Button
        className="dc-navigation-toggler"
        type="primary"
        shape="circle"
        icon={<MenuOutlined />}
        onClick={() => setIsMenuActive(true)}
        size="large"
      />
      {spinnerIndicator.active && (
        <div className="dc-layout-loading" data-active={spinnerIndicator.active}>
          <Spin indicator={antIcon} />
        </div>
      )}
      {isMenuActive && <div className="dc-layout-overlay" onClick={() => setIsMenuActive(false)} />}
      <div className={cs("dc-layout-sidebar", isMenuActive && "active")}>
        <Navigation closeMenu={() => setIsMenuActive(false)} />
        <li
          className="logout-btn ant-menu-item ant-menu-item-only-child d-flex align-items-center"
          role="menuitem"
          tabIndex="-1"
          style={{ paddingLeft: 24, height: 40, fontSize: 16 }}
          data-menu-id="rc-menu-uuid-09660-1-logout"
          onClick={confirmLogout}
        >
          <LogoutOutlined />
          <span className="ant-menu-title-content">Deconectare</span>
        </li>
      </div>
      <div className="dc-layout-content">{children}</div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.element,
};
