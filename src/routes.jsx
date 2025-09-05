import Layout from "./Layout";

import { HomePage, PlaygroundPage, ErrorPage } from "@/pages";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "playground", element: <PlaygroundPage /> },
    ],
  },
];

export default routes;
