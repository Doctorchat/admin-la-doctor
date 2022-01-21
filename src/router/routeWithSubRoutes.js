import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import AuthorizedDeniedRule from "./rules/authorizedDeniedRule";
import PrivateRule from "./rules/privateRule";
import MatchUserRoleRule from "./rules/matchUserRoleRule";
import LoadingRule from "./rules/loadingRule";
import ContainerLayoutRule from "./rules/containerLayoutRule";

const RouteWithSubRoutes = (props) => (
  <Route
    path={props.path}
    render={(routeProps) => {
      if (props.redirectTo) return <Redirect to={props.redirectTo} />;
      if (props.public) return <props.component {...routeProps} {...props} />;
      if (props.private)
        return (
          <PrivateRule
            {...routeProps}
            {...props}
            nextRule={(loadingProps) => (
              <LoadingRule
                {...loadingProps}
                nextRule={(containerLayoutProps) => (
                  <ContainerLayoutRule {...containerLayoutProps} nextRule={MatchUserRoleRule} />
                )}
              />
            )}
          />
        );
      if (!props.private) return <AuthorizedDeniedRule {...routeProps} {...props} />;
      return <Redirect to="/" />;
    }}
  />
);

RouteWithSubRoutes.defaultProps = {
  path: "",
  redirectTo: "",
  private: false,
  public: false,
};

RouteWithSubRoutes.propTypes = {
  path: PropTypes.string,
  redirectTo: PropTypes.string,
  private: PropTypes.bool,
  public: PropTypes.bool,
};

export default RouteWithSubRoutes;
