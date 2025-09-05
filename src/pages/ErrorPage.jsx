import { useRouteError, Link } from "react-router";
import { Home } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center">
      <h2 className="m-4 text-4xl font-bold">
        Error {error.status}: {error.statusText}
      </h2>
      <p className="m-4 text-lg">{error.data}</p>
      <Link
        className="my-8 flex items-center gap-2 rounded-sm bg-red px-8 py-2 text-lg font-bold text-white"
        to="/"
      >
        <Home /> Go Home
      </Link>
    </main>
  );
};

export default ErrorPage;
