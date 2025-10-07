import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router";

import { AppData, AppDataType } from "@/lib/appData";
import { getTheme } from "@/utils/helpers";
import { AppDataContext, ModalContext, ThemeContext } from "@/contexts";

import { Header, ModalManager } from "@/components";

const App = () => {
  const [theme, setTheme] = useState(getTheme);
  const [appData, setAppData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const savedQueries = new AppData(AppDataType.SAVED_QUERIES);
    setAppData((prev) => ({
      ...prev,
      savedQueries,
    }));
  }, []);

  const openModal = useCallback((modal) => {
    setModal(modal);
    setIsModalOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setModal(null);
    setIsModalOpen(false);
  }, []);

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <ModalContext
        value={{
          modal,
          openModal,
          closeModal,
        }}
      >
        <AppDataContext value={{ appData, setAppData }}>
          <div className="flex h-svh flex-col">
            <Header />
            <Outlet />
          </div>
          <ModalManager open={isModalOpen} />
        </AppDataContext>
      </ModalContext>
    </ThemeContext>
  );
};

export default App;
