import { PageHeader } from "antd";
import { useDispatch } from "react-redux";
import { useMount } from "react-use";
import { SupportList } from "../modules";
import { updateSupportCount } from "../store/actions/supportListAction";

export default function SupportListPage() {
  const dispatch = useDispatch();

  useMount(() => {
    dispatch(updateSupportCount());
  });
  return (
    <>
      <PageHeader className="site-page-header" title="Support Chat-uri" />
      <SupportList />
    </>
  );
}
