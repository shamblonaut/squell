import { createBrowserRouter, RouterProvider } from "react-router";

import {
  AppDataProvider,
  ModalProvider,
  SQLEngineProvider,
  ThemeProvider,
} from "@/providers";

import routes from "./routes";

const App = () => {
  return (
    <ThemeProvider>
      <ModalProvider>
        <AppDataProvider>
          <SQLEngineProvider>
            <RouterProvider router={createBrowserRouter(routes)} />
          </SQLEngineProvider>
        </AppDataProvider>
      </ModalProvider>
    </ThemeProvider>
  );
};

export default App;
