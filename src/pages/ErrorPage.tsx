import { Home } from "lucide-react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <main className="flex h-svh flex-col items-center justify-center px-4 text-center">
      <h2 className="m-4 text-4xl font-bold">Route Error</h2>
      {error instanceof Error && (
        <div className="m-4 text-2xl font-medium text-red">
          <p>{error.name}:</p>
          <p>{error.message}</p>
        </div>
      )}
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
