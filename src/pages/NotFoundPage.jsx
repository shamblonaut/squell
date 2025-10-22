import { useLocation, Link } from "react-router";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <main className="flex flex-col h-svh items-center justify-center text-center px-4">
      <h2 className="m-4 text-4xl font-bold">Page Not Found</h2>
      <div className=" m-4 text-2xl font-medium text-red">
        <p>Error 404:</p>
        <p>
          The route{" "}
          <code className="px-2 py-1 bg-base-2 text-invert-0 rounded-md text-xl">
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
