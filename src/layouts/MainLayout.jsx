import PropTypes from "prop-types";
import { Navigation } from "../components";
import { MenuOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useState } from "react";
import cs from "../utils/classNames";
import { useSelector } from "react-redux";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function MainLayout({ children }) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const spinnerIndicator = useSelector((store) => store.spinnerIndicator);

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
      </div>
      <div className="dc-layout-content">{children}</div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.element,
};
