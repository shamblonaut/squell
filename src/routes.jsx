import Layout from "./Layout";

import { DashboardPage, HomePage, ErrorPage } from "@/pages";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
];

export default routes;
