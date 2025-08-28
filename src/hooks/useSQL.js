import { useEffect, useState } from "react";
import initSqlJs from "sql.js";

const useSQL = () => {
  const [SQL, setSQL] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initSqlJs({
      locateFile: (file) => `/${file}`,
    })
      .then((sqljs) => setSQL(sqljs))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { SQL, error, loading };
};

export default useSQL;
