import { DatabaseLayout, RootLayout } from "@/layouts";
import {
  HomePage,
  SandboxPage,
  DashboardPage,
  DatabasePage,
  ErrorPage,
  NotFoundPage,
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
        element: <DatabasePage />,
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
