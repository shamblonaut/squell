import { RouterProvider, createBrowserRouter } from "react-router";

import routes from "./routes";

import {
  AppDataProvider,
  ModalProvider,
  SQLEngineProvider,
  ThemeProvider,
} from "@/providers";

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
