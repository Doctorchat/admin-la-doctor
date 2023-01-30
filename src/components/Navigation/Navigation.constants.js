import { userRoles } from "../../context/constants";

export const menu = [
  {
    key: "dashboard",
    title: "Dashboard",
    link: "/",
  },
  {
    key: "council-list",
    title: "Consilii",
    link: "/council-list",
  },
  {
    key: "withdrawal",
    title: "Cereri de retragere",
    link: "/withdrawal",
  },
  {
    key: "statistics",
    title: "Statistică",
    link: "/statistics",
  },
  {
    key: "transactions",
    title: "Tranzacții",
    link: "/transactions",
  },
  {
    key: "calls",
    title: "Apeluri",
    link: "/calls",
    roles: [userRoles.get("manager")],
  },
  {
    key: "support",
    title: "Support",
    link: "/support",
  },
  {
    key: "sub-doctors",
    title: "Lista de Doctori",
    link: "/doctors",
    children: [
      {
        key: "doctors",
        title: "Doctori",
        link: "/doctors",
      },
      {
        key: "doctors-hidden",
        title: "Doctori Ascunși",
        link: "/doctors?hidden",
      },
    ],
  },
  {
    key: "users",
    title: "Utilizatori",
    link: "/users",
  },
  {
    key: "sub-chats",
    title: "Lista de chat-uri",
    link: "/chats",
    children: [
      {
        key: "chats",
        title: "Chat-uri cu clienți",
        link: "/chats",
      },
      {
        key: "chats-internal",
        title: "Chat-uri între doctori",
        link: "/internals",
      },
    ],
  },
  {
    key: "reviews",
    title: "Testemoniale",
    link: "/reviews",
  },
  {
    key: "promo-codes",
    title: "Promo coduri",
    link: "/promo-codes",
  },
  {
    key: "logs",
    title: "Istoricul",
    link: "/logs",
  },
  {
    key: "global-settings",
    title: "Setări globale",
    link: "/global-settings",
  },
  {
    key: "logout",
    title: "Deconectare",
    link: "/logout",
    className: "logout-btn",
  },
];
