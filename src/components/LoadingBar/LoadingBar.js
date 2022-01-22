import PropTypes from "prop-types";
import cs from "../../utils/classNames";

import "./styles/index.scss";

export default function LoadingBar(props) {
  const { className } = props;

  return (
    <div className={cs("slider", className)}>
      <div className="line" />
      <div className="subline inc" />
      <div className="subline dec" />
    </div>
  );
}

LoadingBar.propTypes = {
  className: PropTypes.string,
};
