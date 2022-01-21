import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

const ContainerLayoutRule = (props) => {
  const { nextRule: NextRule, ...rest } = props;

  const route = (
    <Route
      render={() =>
        (NextRule && <NextRule {...rest} />) || <props.component {...props} />
      }
    />
  );

  return <MainLayout>{route}</MainLayout>;
};

ContainerLayoutRule.defaultProps = {
  containerSize: undefined,
  nextRule: null,
};

ContainerLayoutRule.propTypes = {
  containerSize: PropTypes.oneOf(['sm', 'lg', undefined, null, false]),
  nextRule: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.func,
  ]),
};

export default ContainerLayoutRule;
