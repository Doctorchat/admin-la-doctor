import { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import RouteWithSubRoutes from "./routeWithSubRoutes";

const Router = (props) => (
  <Switch>
    {props.routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route} {...props.propsForRoute} />
    ))}
  </Switch>
);

Router.defaultProps = {
  propsForRoute: {},
};

Router.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  propsForRoute: PropTypes.object,
};

export default memo(Router);
