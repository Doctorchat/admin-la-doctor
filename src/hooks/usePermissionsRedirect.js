import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDeepCompareEffect } from "react-use";

export default function usePermissionsRedirect(config = { allowedRoles: [1] }) {
  const { user } = useSelector((state) => ({
    user: state.user.payload,
  }));

  const history = useHistory();

  useDeepCompareEffect(() => {
    if (user?.id && !config.allowedRoles.includes(user.role)) {
      let path = "/";

      if (user.role === 5) path = "/users";
      if (user.role === 4) path = "/calls";

      history.push(path);
    }
  }, [config.allowedRoles, history, user?.id, user?.role]);
}
