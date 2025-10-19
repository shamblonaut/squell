import App from "./App";

import { HomePage, SandboxPage, DashboardPage, ErrorPage } from "@/pages";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "sandbox", element: <SandboxPage /> },
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
];

export default routes;
