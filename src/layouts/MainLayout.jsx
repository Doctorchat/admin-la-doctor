import PropTypes from "prop-types";
import { Navigation } from "../components";
import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import cs from "../utils/classNames";

export default function MainLayout({ children }) {
  const [isMenuActive, setIsMenuActive] = useState(false);

  return (
    <div className="dc-layoyt">
      <Button
        className="dc-navigation-toggler"
        type="primary"
        shape="circle"
        icon={<MenuOutlined />}
        onClick={() => setIsMenuActive(true)}
        size="large"
      />
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
