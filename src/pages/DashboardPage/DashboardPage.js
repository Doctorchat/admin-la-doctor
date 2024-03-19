import { Button, Form, PageHeader } from "antd";
import { Link } from "react-router-dom";
import { ChatsList, ReviewsList, WithdrawalList } from "../../modules/";
import usePermissionsRedirect from "../../hooks/usePermissionsRedirect";

import "./styles/index.scss";

export default function DashboardPage() {
  usePermissionsRedirect();

  const [form] = Form.useForm();

  return (
    <>
      <PageHeader className="site-page-header" title="Dashboard" />
      <WithdrawalList
        title="Cereri de retragere recente"
        simplified
        extra={
          <div className="w-100 d-flex justify-content-end">
            <Link to="/withdrawal">
              <Button type="link" className="py-0">
                Vezi toata lista
              </Button>
            </Link>
          </div>
        }
      />
      <div className="my-5" />
      <ChatsList
        title="Mesaje Recente"
        simplified
        extra={
          <div className="w-100 d-flex justify-content-end">
            <Link to="/chats">
              <Button type="link" className="py-0">
                Vezi toata lista
              </Button>
            </Link>
          </div>
        }
      />
      <div className="my-5" />
      <ReviewsList
        title="Testemoniale Recente"
        simplified
        extra={
          <div className="w-100 d-flex justify-content-end">
            <Link to="/reviews">
              <Button type="link" className="py-0">
                Vezi toata lista
              </Button>
            </Link>
          </div>
        }
      />
    </>
  );
}
