import PropTypes from "prop-types";
import { CheckOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, notification } from "antd";
import React, { useState } from "react";
import { getApiErrorMessage } from "../../../utils/getApiErrorMessages";
import api from "../../../utils/appApi";
import { CHAT_FLAGS } from "../../../context/constants";

export const ChatFlag = ({ chatId, defaultFlagKey = "OPEN" }) => {
  const [flagKey, setFlagKey] = useState(defaultFlagKey);

  const updateFlagKey = React.useCallback(
    async ({ key }) => {
      try {
        await api.support.updateFlag(chatId, key);
        setFlagKey(key);
      } catch (error) {
        notification.error({
          message: "Ошибка",
          description: getApiErrorMessage(error),
        });
      }
    },
    [chatId]
  );

  return (
    <Dropdown
      destroyPopupOnHide={false}
      placement="topLeft"
      trigger={["click"]}
      menu={{
        className: "chat-view__dropdown-menu",
        items: [
          {
            type: "group",
            label: "Flag",
            children: [
              {
                className: "chat-view__flag OPEN",
                label: CHAT_FLAGS["OPEN"],
                key: "OPEN",
                icon: flagKey === "OPEN" ? <CheckOutlined /> : null,
                onClick: updateFlagKey,
              },
              {
                className: "chat-view__flag IN_WORK",
                label: CHAT_FLAGS["IN_WORK"],
                key: "IN_WORK",
                icon: flagKey === "IN_WORK" ? <CheckOutlined /> : null,
                onClick: updateFlagKey,
              },
              {
                className: "chat-view__flag CLOSED",
                label: CHAT_FLAGS["CLOSED"],
                key: "CLOSED",
                icon: flagKey === "CLOSED" ? <CheckOutlined /> : null,
                onClick: updateFlagKey,
              },
            ],
          },
        ],
      }}
    >
      <Button icon={<MoreOutlined />} className="me-1" />
    </Dropdown>
  );
};

ChatFlag.propTypes = {
  chatId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultFlagKey: PropTypes.string,
};
