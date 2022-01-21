---
to: <%= absPath %>/<%= component_name %>.js
---
import PropTypes from "prop-types";

import "./styles/index.scss";

export default function <%= component_name %>(props) {
  const { ...rest } = props;
}

<%= component_name %>.propTypes = {};

<%= component_name %>.defaultProps = {};
