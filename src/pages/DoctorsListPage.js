import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DoctorsList } from "../modules";
import { updateRequestsCount } from "../store/actions/requestsCountAction";

export default function DoctorsListPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateRequestsCount());
  }, [dispatch]);

  return <DoctorsList />;
}
