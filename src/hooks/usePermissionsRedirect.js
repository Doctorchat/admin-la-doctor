import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDeepCompareEffect } from "react-use";

export default function usePermissionsRedirect(config = { allowedRoles: [1] }) {
  const { user } = useSelector((state) => ({
    user: state.user.payload,
  }));

  const history = useHistory();

  useDeepCompareEffect(() => {
    if (user && !config.allowedRoles.includes(user.role)) {
      if (user.role === 4) {
        history.push("/calls");
      } else {
        history.push("/");
      }
    }
  }, [config.allowedRoles, history, user]);
}
