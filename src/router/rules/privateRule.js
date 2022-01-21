import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRule = (props) => {
  const { nextRule: NextRule, ...rest } = props;
  return (
    <Route
      render={() =>
        (props.isAuthorized && NextRule && <NextRule {...rest} />) ||
        (props.isAuthorized && <props.component {...props} />) || <Redirect to="/login" />
      }
    />
  );
};

PrivateRule.defaultProps = {
  nextRule: null,
};

PrivateRule.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  nextRule: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
};

const mapStateToProps = (store) => ({
  isAuthorized: store.user.isAuthorized,
});

export default connect(mapStateToProps)(PrivateRule);
