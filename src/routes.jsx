import App from "./App";

import { HomePage, PlaygroundPage, ErrorPage } from "@/pages";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "playground", element: <PlaygroundPage /> },
    ],
  },
];

export default routes;
