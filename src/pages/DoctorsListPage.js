import { PageHeader, Button, Badge } from "antd";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { DoctorsList } from "../modules";
import { setCleanOnUnmountFalse } from "../store/actions/doctorsListAction";
import { updateRequestsCount } from "../store/actions/requestsCountAction";

export default function DoctorsListPage() {
  const requestsCount = useSelector((store) => store.requestsCount);
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

  useEffect(() => {
    dispatch(updateRequestsCount());
  }, [dispatch]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title="Doctori"
        extra={[
          <Badge key="doctors-list-requests" count={requestsCount.count} showZero>
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
