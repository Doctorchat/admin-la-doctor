import {
  DashboardPage,
  LoginPage,
  ChatViewPage,
  ChatsListPage,
  ReviewsListPage,
  DoctorsListPage,
  DoctorViewPage,
  DoctorsRequestsPage,
} from "../pages/";

const routes = [
  {
    path: "/login",
    component: LoginPage,
    exact: true,
    private: false,
  },
  {
    path: "/",
    component: DashboardPage,
    exact: true,
    private: true,
  },
  {
    path: "/chats",
    component: ChatsListPage,
    exact: true,
    private: true,
  },
  {
    path: "/chat/:chat_id",
    component: ChatViewPage,
    exact: true,
    private: true,
  },
  {
    path: "/reviews",
    component: ReviewsListPage,
    exact: true,
    private: true,
  },
  {
    path: "/doctors",
    component: DoctorsListPage,
    exact: true,
    private: true,
  },
  {
    path: "/doctor/:doc_id",
    component: DoctorViewPage,
    exact: true,
    private: true,
  },
  {
    path: "/requests",
    component: DoctorsRequestsPage,
    exact: true,
    private: true,
  },
];

export default routes;
