import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { FullPageLoading } from "../../components";

const LoadingRule = (props) => {
  const { nextRule: NextRule, ...rest } = props;
  return (
    <Route
      render={() =>
        (props.userId && NextRule && <NextRule {...rest} />) ||
        (props.userId && <props.component {...props} />) || <FullPageLoading />
      }
    />
  );
};

LoadingRule.defaultProps = {
  userId: null,
  nextRule: null,
  globalDataLoaded: null,
};

LoadingRule.propTypes = {
  userId: PropTypes.number,
  nextRule: PropTypes.oneOfType([PropTypes.element, PropTypes.object, PropTypes.func]),
  globalDataLoaded: PropTypes.bool,
};

const mapStateToProps = (store) => ({
  userId: store.user.payload.id,
});

export default connect(mapStateToProps)(LoadingRule);
