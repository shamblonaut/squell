import { useRouteError, Link } from "react-router";
import { Home } from "lucide-react";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <main className="flex flex-col h-svh items-center justify-center text-center px-4">
      <h2 className="m-4 text-4xl font-bold">Route Error</h2>
      <div>
        <p className="italic">{error.fileName}</p>
      </div>
      <div className=" m-4 text-2xl font-medium text-red">
        <p>{error.name}:</p>
        <p>{error.message}</p>
      </div>
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
