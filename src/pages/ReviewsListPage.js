import { PageHeader } from "antd";
import { ReviewsList } from "../modules";

export default function ReviewsListPage() {
  return (
    <>
      <PageHeader className="site-page-header" title="Testemoniale" />
      <ReviewsList />
    </>
  );
}
