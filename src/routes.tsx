import { DatabaseLayout, RootLayout } from "@/layouts";
import {
  DashboardPage,
  DatabaseQueryPage,
  DatabaseTablePage,
  ErrorPage,
  HomePage,
  NotFoundPage,
  SandboxPage,
} from "@/pages";

const routes = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
    ],
  },
  {
    path: "/sandbox",
    element: <SandboxPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/db",
    element: <DatabaseLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: ":dbId",
        element: <DatabaseQueryPage />,
      },
      {
        path: ":dbId/table/:tableName",
        element: <DatabaseTablePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
