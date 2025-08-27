import logo from "/logo.svg";

const HomePage = () => {
  return (
    <main className="mx-auto flex min-h-svh flex-col justify-center text-center">
      <img className="mx-auto w-80" src={logo} alt="Squell Logo" />
      <h1 className="m-4 text-5xl font-bold">Squell</h1>
      <h3 className="text-3xl font-medium">Your favourite SQL Editor</h3>
    </main>
  );
};

export default HomePage;
