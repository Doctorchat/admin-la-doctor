import PropTypes from "prop-types";
import { Spin } from "antd";
import cs from "../utils/classNames";

const FullPageLoading = (props) => {
  const { style, className, ...rest } = props;
  return (
    <div
      {...rest}
      style={{ height: "100vh", ...style }}
      className={cs("loading d-flex justify-content-center align-items-center px-3", className)}
    >
      <Spin size="large" tip="Loading..." style={{ fontSize: 20 }} />
    </div>
  );
};

FullPageLoading.defaultProps = {
  style: {},
  className: "",
};

FullPageLoading.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

export default FullPageLoading;
