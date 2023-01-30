import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function Permissions({ roles = [], children }) {
  const { user } = useSelector((state) => ({
    user: state.user.payload,
  }));

  if (user && (roles.includes(user.role) || user.role === 1)) {
    return children;
  }

  return null;
}

Permissions.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.node,
};
