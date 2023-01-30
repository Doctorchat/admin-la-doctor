import { PageHeader } from "antd";
import { useDispatch } from "react-redux";
import { useMount } from "react-use";
import { SupportList } from "../modules";
import { updateSupportCount } from "../store/actions/supportListAction";
import usePermissionsRedirect from "../hooks/usePermissionsRedirect";

export default function SupportListPage() {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(updateSupportCount());
  });

  usePermissionsRedirect();

  return (
    <>
      <PageHeader className="site-page-header" title="Support Chat-uri" />
      <SupportList />
    </>
  );
}
