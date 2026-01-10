import { Home } from "lucide-react";
import { Link, useLocation } from "react-router";

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <main className="flex h-svh flex-col items-center justify-center px-4 text-center">
      <h2 className="m-4 text-4xl font-bold">Page Not Found</h2>
      <div className=" m-4 text-2xl font-medium text-red">
        <p>Error 404:</p>
        <p>
          The route{" "}
          <code className="rounded-md bg-base-2 px-2 py-1 text-xl text-invert-0">
            {location.pathname}
          </code>{" "}
          does not lead anywhere
        </p>
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

export default NotFoundPage;
