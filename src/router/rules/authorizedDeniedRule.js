import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const AuthorizedDeniedRule = (props) => {
  const { nextRule: NextRule, ...rest } = props;
  return (
    <Route
      render={() =>
        (props.isAuthorized && <Redirect to="/" />) ||
        (NextRule && <NextRule {...rest} />) || <props.component {...props} />
      }
    />
  );
};

AuthorizedDeniedRule.defaultProps = {
  nextRule: null,
};

AuthorizedDeniedRule.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  nextRule: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
};

const mapStateToProps = (store) => ({
  isAuthorized: store.user.isAuthorized,
});

export default connect(mapStateToProps)(AuthorizedDeniedRule);
