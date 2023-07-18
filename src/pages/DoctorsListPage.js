import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DoctorsList } from "../modules";
import { updateRequestsCount } from "../store/actions/requestsCountAction";
import usePermissionsRedirect from "../hooks/usePermissionsRedirect";

export default function DoctorsListPage() {
  usePermissionsRedirect();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateRequestsCount());
  }, [dispatch]);

  return <DoctorsList />;
}
