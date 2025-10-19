import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router";

import { AppData, AppDataType } from "@/lib/appData";
import { SQLiteDBManager } from "@/lib/sqlite";

import { getTheme } from "@/utils/helpers";
import { AppDataContext, ModalContext, ThemeContext } from "@/contexts";

import { Header, ModalManager } from "@/components";

const App = () => {
  const [theme, setTheme] = useState(getTheme);
  const [appData, setAppData] = useState({});

  const [sqlLoading, setSqlLoading] = useState(true);
  const [sqlInitError, setSqlInitError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const savedQueries = new AppData(AppDataType.SAVED_QUERIES);
    const dbData = new AppData(AppDataType.DB_DATA);

    setAppData({ savedQueries, dbData });
  }, []);

  useEffect(() => {
    SQLiteDBManager.init()
      .catch((error) => {
        setSqlInitError(error.message);
      })
      .finally(() => {
        setSqlLoading(false);
      });
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
        <AppDataContext value={appData}>
          <div className="flex min-h-svh flex-col lg:h-svh">
            <Header />
            <Outlet context={{ sqlLoading, sqlInitError }} />
          </div>
          <ModalManager open={isModalOpen} />
        </AppDataContext>
      </ModalContext>
    </ThemeContext>
  );
};

export default App;
