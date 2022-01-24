import { PageHeader, Button, Badge } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DoctorsList } from "../modules";
import { setCleanOnUnmountFalse } from "../store/actions/doctorsListAction";

export default function DoctorsListPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOutsideLinkClick = useCallback(
    (path) => async (e) => {
      e.preventDefault();

      await dispatch(setCleanOnUnmountFalse());
      history.push(path);
    },
    [dispatch, history]
  );

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Doctori"
        extra={[
          <Badge key="doctors-list-requests" count={0} showZero>
            <Link to="/requests" onClick={handleOutsideLinkClick("/requests")}>
              <Button type="primary">Cereri</Button>
            </Link>
          </Badge>,
        ]}
      />
      <DoctorsList />
    </>
  );
}
