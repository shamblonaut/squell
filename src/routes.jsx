import { DashboardPage, HomePage } from "@/pages";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
];

export default routes;
