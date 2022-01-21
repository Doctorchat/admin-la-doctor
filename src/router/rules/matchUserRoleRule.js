import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const MatchUserRole = (props) => {
  const { nextRule: NextRule, ...rest } = props;
  const match =
    (Array.isArray(props.matchUserRole) && props.matchUserRole.includes(props.userRole)) ||
    props.userRole === props.matchUserRole ||
    props.matchUserRole === -1;
  return (
    <Route
      render={() =>
        (match && NextRule && <NextRule {...rest} />) ||
        (match && <props.component {...props} />) || <Redirect to="/" />
      }
    />
  );
};

MatchUserRole.defaultProps = {
  userRole: null,
  matchUserRole: -1,
  nextRule: null,
};

MatchUserRole.propTypes = {
  userRole: PropTypes.number,
  matchUserRole: PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.number)]),
  nextRule: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
};

const mapStateToProps = (store) => ({
  userRole: store.user.payload.role,
});

export default connect(mapStateToProps)(MatchUserRole);
