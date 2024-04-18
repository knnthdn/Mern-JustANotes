import logo from "/header-icon.png";

function RootHeader() {
  return (
    <header className="flex gap-1 items-center font-semibold px-4 py-4 text-3xl text-main border-b border-b-gray-400 sm:px-8 lg:py-6 ">
      <img src={logo} alt="Logo notes" />
      <h1 className="text-main md:text-4xl ">Just a Notes</h1>
    </header>
  );
}

export default RootHeader;
